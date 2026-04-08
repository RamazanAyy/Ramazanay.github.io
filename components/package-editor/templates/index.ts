import type { Canvas } from 'fabric/fabric-impl';
import { loadWipeTemplate } from './WipeTemplate';
import { loadDiaperTemplate } from './DiaperTemplate';
import { loadPadTemplate } from './PadTemplate';
import { loadAdultTemplate } from './AdultTemplate';
import type { TemplateOptions } from '../types/editor.types';

export const templates: Record<string, (canvas: Canvas, opts: TemplateOptions) => void> = {
  wipe: loadWipeTemplate,
  diaper: loadDiaperTemplate,
  pad: loadPadTemplate,
  adult: loadAdultTemplate,
};
