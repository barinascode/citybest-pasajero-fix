import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { CountriesEntities } from '../CountriesList';
import AppCountriesService from '../services/AppCountriesService';

export const APPCOUNTRIES_FEATURE_KEY = 'appCountries';

/*
 * Update these interfaces according to your requirements.
 */
export interface AppCountriesEntity extends CountriesEntities{
  id: number;
}

export interface AppCountriesState extends EntityState<AppCountriesEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | null | undefined;
}

export const appCountriesAdapter = createEntityAdapter<AppCountriesEntity>();

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
 *   dispatch(fetchAppCountries())
 * }, [dispatch]);
 * ```
 */
export const fetchAppCountries:any = createAsyncThunk(
  'appCountries/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getAppCountriess()`;
     * Right now we just return an empty array.
     */
    const data = await AppCountriesService.fetchAppCountries()
    return data
  }
);

export const initialAppCountriesState: AppCountriesState =
  appCountriesAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
  });

export const appCountriesSlice = createSlice({
  name: APPCOUNTRIES_FEATURE_KEY,
  initialState: initialAppCountriesState,
  reducers: {
    add: appCountriesAdapter.addOne,
    remove: appCountriesAdapter.removeOne,
    setMany: appCountriesAdapter.setMany,
    upsertMany: appCountriesAdapter.upsertMany,
    upsert: appCountriesAdapter.upsertOne,
    setAll: appCountriesAdapter.setAll
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppCountries.pending, (state: AppCountriesState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchAppCountries.fulfilled,
        (
          state: AppCountriesState,
          action: PayloadAction<AppCountriesEntity[]>
        ) => {
          appCountriesAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(
        fetchAppCountries.rejected,
        (state: AppCountriesState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message;
        }
      );
  },
});

/*
 * Export reducer for store configuration.
 */
export const appCountriesReducer = appCountriesSlice.reducer;

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
 *   dispatch(appCountriesActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const appCountriesActions = appCountriesSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllAppCountries);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = appCountriesAdapter.getSelectors();

export const getAppCountriesState = (rootState: any): AppCountriesState =>
  rootState[APPCOUNTRIES_FEATURE_KEY];

export const selectAllAppCountries = createSelector(
  getAppCountriesState,
  selectAll
);

export const selectAppCountriesEntities = createSelector(
  getAppCountriesState,
  selectEntities
);
