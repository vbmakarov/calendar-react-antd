import {INotes} from "../../types/notesTypes";
import {getDataMemory} from "../../service/dataMemoryService";

const notes = getDataMemory('notes')

export const NotesState:INotes = notes? {...notes} : {}