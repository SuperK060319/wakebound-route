from __future__ import annotations

import math
import wave
from pathlib import Path

import numpy as np


SR = 44_100
OUT = Path(__file__).resolve().parents[1] / "audio-previews"
OUT.mkdir(exist_ok=True)
RNG = np.random.default_rng(7319)


def midi(note: float) -> float:
    return 440.0 * 2 ** ((note - 69) / 12)


def envelope(size: int, attack=.04, release=.18, sustain=.72) -> np.ndarray:
    env = np.full(size, sustain, dtype=np.float32)
    a = min(size, int(attack * SR))
    r = min(size - a, int(release * SR))
    if a:
        env[:a] = np.linspace(0, 1, a, endpoint=False)
    if r:
        env[-r:] = np.linspace(sustain, 0, r)
    return env


def tone(freq: float, duration: float, kind="triangle", vibrato=0.0) -> np.ndarray:
    n = max(1, int(duration * SR))
    t = np.arange(n, dtype=np.float32) / SR
    phase = 2 * np.pi * freq * t + vibrato * np.sin(2 * np.pi * 5.2 * t)
    if kind == "sine":
        sound = np.sin(phase)
    elif kind == "square":
        sound = np.tanh(2.7 * np.sin(phase))
    elif kind == "saw":
        sound = sum(np.sin(k * phase) / k for k in range(1, 8)) * .55
    elif kind == "bell":
        sound = np.sin(phase) + .48 * np.sin(2.01 * phase) + .2 * np.sin(3.97 * phase)
    else:
        sound = 2 / np.pi * np.arcsin(np.sin(phase))
    return (sound * envelope(n)).astype(np.float32)


def add_note(track: np.ndarray, start: float, duration: float, note: float, amp: float, kind="triangle", pan=0.0, vibrato=0.0):
    mono = tone(midi(note), duration, kind, vibrato) * amp
    begin = int(start * SR)
    end = min(len(track), begin + len(mono))
    if end <= begin:
        return
    mono = mono[: end - begin]
    track[begin:end, 0] += mono * math.sqrt((1 - pan) / 2)
    track[begin:end, 1] += mono * math.sqrt((1 + pan) / 2)


def add_kick(track: np.ndarray, start: float, amp=.55):
    n = int(.34 * SR)
    t = np.arange(n) / SR
    freq = 88 * np.exp(-t * 7) + 38
    phase = 2 * np.pi * np.cumsum(freq) / SR
    sound = np.sin(phase) * np.exp(-t * 12) * amp
    place_mono(track, start, sound)


def add_tom(track: np.ndarray, start: float, note=45, amp=.36, pan=0.0):
    n = int(.42 * SR)
    t = np.arange(n) / SR
    sound = np.sin(2 * np.pi * midi(note) * t) * np.exp(-t * 8) * amp
    place_mono(track, start, sound, pan)


def add_snare(track: np.ndarray, start: float, amp=.24):
    n = int(.24 * SR)
    t = np.arange(n) / SR
    noise = RNG.standard_normal(n)
    noise = np.concatenate(([0], np.diff(noise)))
    sound = noise * np.exp(-t * 18) * amp
    place_mono(track, start, sound, .08)


def place_mono(track: np.ndarray, start: float, sound: np.ndarray, pan=0.0):
    begin = int(start * SR)
    end = min(len(track), begin + len(sound))
    if end <= begin:
        return
    sound = sound[: end - begin]
    track[begin:end, 0] += sound * math.sqrt((1 - pan) / 2)
    track[begin:end, 1] += sound * math.sqrt((1 + pan) / 2)


def add_ocean(track: np.ndarray, amp=.035):
    noise = RNG.standard_normal(len(track))
    kernel = np.ones(500) / 500
    smooth = np.convolve(noise, kernel, mode="same")
    swell = .45 + .55 * np.sin(np.arange(len(track)) / SR * 2 * np.pi / 5.5) ** 2
    track[:, 0] += smooth * swell * amp
    track[:, 1] += np.roll(smooth, 1400) * swell * amp


def finish(track: np.ndarray, name: str):
    dry = track.copy()
    for delay, gain in ((.13, .18), (.27, .11), (.41, .07)):
        d = int(delay * SR)
        track[d:] += dry[:-d] * gain
    fade = int(1.5 * SR)
    track[-fade:] *= np.linspace(1, 0, fade)[:, None]
    peak = max(.001, float(np.max(np.abs(track))))
    pcm = np.int16(np.clip(track / peak * .88, -1, 1) * 32767)
    path = OUT / f"{name}.wav"
    with wave.open(str(path), "wb") as wav:
        wav.setnchannels(2)
        wav.setsampwidth(2)
        wav.setframerate(SR)
        wav.writeframes(pcm.tobytes())
    print(path)


def black_sails():
    tempo = 92
    beat = 60 / tempo
    beats = 40
    track = np.zeros((int((beats * beat + 2) * SR), 2), np.float32)
    progression = [[50, 57, 62], [46, 53, 58], [48, 55, 60], [50, 57, 62]]
    melody = [62, 65, 69, 67, 65, 62, 60, 62, 65, 67, 69, 72, 69, 67, 65, 62]
    for bar in range(10):
        chord = progression[bar % 4]
        start = bar * 4 * beat
        for note in chord:
            add_note(track, start, 3.8 * beat, note, .075, "saw", pan=(note - 55) / 22, vibrato=.025)
        for step in range(4):
            at = start + step * beat
            add_note(track, at, .72 * beat, chord[0] - 12, .19, "triangle", pan=-.15)
            add_kick(track, at, .42 if step in (0, 2) else .25)
            if step in (1, 3): add_snare(track, at, .18)
        for half in range(8):
            note = melody[(bar * 2 + half) % len(melody)]
            add_note(track, start + half * beat / 2, .4 * beat, note, .09, "square", pan=.18, vibrato=.04)
    add_ocean(track, .025)
    finish(track, "01-black-sails-drums")


def fog_sea():
    tempo = 68
    beat = 60 / tempo
    beats = 28
    track = np.zeros((int((beats * beat + 2) * SR), 2), np.float32)
    for start, root in ((0, 50), (7, 46), (14, 48), (21, 50)):
        t = start * beat
        for note, pan in ((root - 12, -.25), (root, .15), (root + 7, .32)):
            add_note(track, t, 6.8 * beat, note, .075, "sine", pan, vibrato=.035)
    bells = [(1, 74), (4, 69), (7, 72), (10, 65), (13, 69), (16, 67), (19, 72), (22, 69), (25, 74)]
    for step, note in bells:
        add_note(track, step * beat, 2.2, note, .15, "bell", pan=(-1) ** step * .32)
    for step in range(0, beats, 2):
        add_tom(track, step * beat, 38, .22, -.1)
    add_ocean(track, .095)
    finish(track, "02-whispers-on-fog-sea")


def storm_chase():
    tempo = 118
    beat = 60 / tempo
    beats = 48
    track = np.zeros((int((beats * beat + 2) * SR), 2), np.float32)
    roots = [45, 45, 43, 41, 45, 48]
    phrase = [57, 60, 64, 60, 67, 64, 60, 59]
    for bar in range(12):
        root = roots[bar % len(roots)]
        start = bar * 4 * beat
        for step in range(8):
            at = start + step * beat / 2
            add_note(track, at, .37 * beat, root + (12 if step % 2 else 0), .13, "saw", pan=-.16)
            add_note(track, at, .32 * beat, phrase[(bar + step) % len(phrase)], .075, "square", pan=.26)
        for step in range(4):
            at = start + step * beat
            add_kick(track, at, .4 if step in (0, 2) else .23)
            if step in (1, 3): add_snare(track, at, .21)
            add_tom(track, at + beat / 2, 43 + step * 2, .16, (step - 1.5) / 3)
        add_note(track, start, 3.7 * beat, root + 7, .06, "triangle", pan=.05, vibrato=.02)
    add_ocean(track, .018)
    finish(track, "03-storm-pursuit")


black_sails()
fog_sea()
storm_chase()
