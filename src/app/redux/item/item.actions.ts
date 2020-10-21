import {createAction, props} from "@ngrx/store";
import {lStorage} from "../../model/feed";


export const initStorage = createAction('[Item Component] initStorage');
export const loadStorage = createAction('[Item Component] loadStorage', props<{item: lStorage[]}>());
export const addStorage = createAction('[Item Component] addStorage', props<{item: lStorage}>());
export const removeStorage = createAction('[Item Component] removeStorage', props<{item: lStorage}>());

