import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { AppDocumentTypes, DocumentTypeEntity } from '../data/AppDocumentTypes';


export const APPDOCUMENTSTYPES_FEATURE_KEY = 'appDocumentsTypes';

/*
 * Update these interfaces according to your requirements.
 */
export interface AppDocumentsTypesEntity extends DocumentTypeEntity{
  id: string;
}

export interface AppDocumentsTypesState
  extends EntityState<AppDocumentsTypesEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | null | undefined;
}

export const appDocumentsTypesAdapter =
  createEntityAdapter<AppDocumentsTypesEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchAppDocumentsTypes())
 * }, [dispatch]);
 * ```
 */
export const fetchAppDocumentsTypes:any = createAsyncThunk(
  'appDocumentsTypes/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getAppDocumentsTypess()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([ ...AppDocumentTypes ]);
  }
);

export const initialAppDocumentsTypesState: AppDocumentsTypesState =
  appDocumentsTypesAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
  });

export const appDocumentsTypesSlice = createSlice({
  name: APPDOCUMENTSTYPES_FEATURE_KEY,
  initialState: initialAppDocumentsTypesState,
  reducers: {
    add: appDocumentsTypesAdapter.addOne,
    remove: appDocumentsTypesAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAppDocumentsTypes.pending,
        (state: AppDocumentsTypesState) => {
          state.loadingStatus = 'loading';
        }
      )
      .addCase(
        fetchAppDocumentsTypes.fulfilled,
        (
          state: AppDocumentsTypesState,
          action: PayloadAction<AppDocumentsTypesEntity[]>
        ) => {
          appDocumentsTypesAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(
        fetchAppDocumentsTypes.rejected,
        (state: AppDocumentsTypesState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message;
        }
      );
  },
});

/*
 * Export reducer for store configuration.
 */
export const appDocumentsTypesReducer = appDocumentsTypesSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(appDocumentsTypesActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const appDocumentsTypesActions = appDocumentsTypesSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllAppDocumentsTypes);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = appDocumentsTypesAdapter.getSelectors();

export const getAppDocumentsTypesState = (
  rootState: any
): AppDocumentsTypesState => rootState[APPDOCUMENTSTYPES_FEATURE_KEY];

export const selectAllAppDocumentsTypes = createSelector(
  getAppDocumentsTypesState,
  selectAll
);

export const selectAppDocumentsTypesEntities = createSelector(
  getAppDocumentsTypesState,
  selectEntities
);
