import React, { useState } from 'react';
import { Volume2, Music, Sparkles } from 'lucide-react';
import { audioEngine } from '../lib/audioEngine';

interface InteractiveFretboardProps {
  tuning?: string;
}

export const InteractiveFretboard: React.FC<InteractiveFretboardProps> = ({ tuning = 'Standard' }) => {
  const [activeNote, setActiveNote] = useState<{ string: number; fret: number; noteName: string } | null>(null);

  const stringNames = tuning === 'DADGAD' 
    ? ['d', 'A', 'G', 'D', 'A', 'D'] 
    : ['E', 'B', 'G', 'D', 'A', 'E']; // 1 to 6

  const frets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Note names mapping for standard tuning
  const noteMatrix: string[][] = [
    ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'], // String 1 (High E)
    ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'], // String 2 (B)
    ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'], // String 3 (G)
    ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'], // String 4 (D)
    ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'], // String 5 (A)
    ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'], // String 6 (Low E)
  ];

  const handleFretClick = (stringNum: number, fret: number) => {
    const noteName = noteMatrix[stringNum - 1]?.[fret] || 'Note';
    audioEngine.playNote(stringNum, fret, 'pluck', 1.5, tuning);
    setActiveNote({ string: stringNum, fret, noteName });

    setTimeout(() => {
      setActiveNote(null);
    }, 800);
  };

  const handleHarmonicClick = (stringNum: number, fret: number) => {
    const noteName = `${noteMatrix[stringNum - 1]?.[fret]} Harmonic`;
    audioEngine.playNote(stringNum, fret, 'harmonic', 2.0, tuning);
    setActiveNote({ string: stringNum, fret, noteName });

    setTimeout(() => {
      setActiveNote(null);
    }, 1000);
  };

  const handleSlapClick = () => {
    audioEngine.playNote(6, 0, 'slap', 0.5, tuning);
    setActiveNote({ string: 6, fret: 0, noteName: 'Percussive Slap 🥁' });

    setTimeout(() => {
      setActiveNote(null);
    }, 600);
  };

  return (
    <div className="bg-amber-950/40 border border-amber-900/40 rounded-2xl p-4 sm:p-6 backdrop-blur-md text-amber-100 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm tracking-wide">
            <Volume2 className="w-4 h-4" />
            <span>ลองดีดสายกีตาร์สดบนเว็บบราวเซอร์</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">Virtual Fingerstyle Fretboard</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSlapClick}
            className="px-3 py-1.5 bg-amber-800/60 hover:bg-amber-700 text-amber-200 text-xs font-medium rounded-lg border border-amber-600/40 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>ลองเคาะบอดี้ Slap</span>
          </button>
          {activeNote && (
            <div className="px-3 py-1.5 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-lg border border-amber-500/40 animate-pulse">
              {activeNote.noteName} (สาย {activeNote.string}, เฟรต {activeNote.fret})
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-amber-200/70 mb-4">
        คลิกที่ปุ่มตัวเลขบนสายกีตาร์เพื่อทดลองฟังเสียงโน้ตแต่ละเฟรต หรือดีดเฟรต 12 เพื่อฟังเสียง Natural Harmonic!
      </p>

      {/* Fretboard Graphic */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[700px] relative bg-amber-950/80 rounded-xl p-3 border border-amber-800/50 shadow-inner">
          {/* Fret Markers on Top */}
          <div className="grid grid-cols-13 text-center text-[10px] text-amber-400/80 font-mono mb-2">
            <div>Nut</div>
            {frets.slice(1).map((f) => (
              <div key={f} className="flex justify-center items-center">
                <span className={f === 3 || f === 5 || f === 7 || f === 9 || f === 12 ? 'text-amber-300 font-bold' : ''}>
                  {f} {f === 12 ? '✨' : ''}
                </span>
              </div>
            ))}
          </div>

          {/* Strings 1 to 6 */}
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6].map((stringNum) => {
              const strName = stringNames[stringNum - 1];
              // Thicker wire width for bass strings
              const stringThickness = [1, 1.5, 2, 2.5, 3, 3.5][stringNum - 1];

              return (
                <div key={stringNum} className="relative flex items-center group">
                  {/* String Label */}
                  <div className="w-10 text-xs font-bold font-mono text-amber-300 flex items-center justify-center bg-amber-900/60 rounded py-1 mr-2 border border-amber-700/50">
                    {strName} ({stringNum})
                  </div>

                  {/* Wire Line */}
                  <div
                    className="absolute left-12 right-0 bg-gradient-to-r from-amber-200/90 via-amber-400/80 to-amber-200/90 z-0 pointer-events-none group-hover:bg-amber-300 transition"
                    style={{ height: `${stringThickness}px`, top: '50%', transform: 'translateY(-50%)' }}
                  />

                  {/* Fret Click Nodes */}
                  <div className="grid grid-cols-13 flex-1 relative z-10">
                    {frets.map((fret) => {
                      const isHarmonicFret = fret === 12 || fret === 7 || fret === 5;
                      const isActive = activeNote?.string === stringNum && activeNote?.fret === fret;

                      return (
                        <div key={fret} className="flex justify-center items-center py-1">
                          <button
                            onClick={() => (isHarmonicFret ? handleHarmonicClick(stringNum, fret) : handleFretClick(stringNum, fret))}
                            title={`สาย ${stringNum} - เฟรต ${fret}`}
                            className={`w-6 h-6 rounded-full text-[10px] font-mono flex items-center justify-center transition-all duration-150 transform active:scale-90 ${
                              isActive
                                ? 'bg-amber-400 text-amber-950 font-extrabold ring-4 ring-amber-300/50 scale-125'
                                : isHarmonicFret
                                ? 'bg-amber-600/70 hover:bg-amber-500 text-amber-100 border border-amber-300/60 shadow-sm'
                                : 'bg-amber-950/90 hover:bg-amber-700/80 text-amber-300/90 border border-amber-800/80'
                            }`}
                          >
                            {fret}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
