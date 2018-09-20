/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { kfetch } from 'ui/kfetch';

import { Action } from 'redux-actions';
import {
  deleteRepo,
  deleteRepoFailed,
  deleteRepoSuccess,
  fetchRepoConfigFailed,
  fetchRepoConfigs,
  fetchRepoConfigSuccess,
  fetchRepos,
  fetchReposFailed,
  fetchReposSuccess,
  gotoRepo,
  importRepo,
  importRepoFailed,
  importRepoSuccess,
  indexRepo,
  indexRepoFailed,
  indexRepoSuccess,
  initRepoCommand,
} from '../actions';
import { loadStatus } from '../actions/status';
import { history } from '../utils/url';

function requestRepos(): any {
  return kfetch({ pathname: '../api/cs/repos' });
}

function* handleFetchRepos() {
  try {
    const repos = yield call(requestRepos);
    yield put(fetchReposSuccess(repos));
    for (const repo of repos) {
      yield put(loadStatus(repo.uri));
    }
  } catch (err) {
    yield put(fetchReposFailed(err));
  }
}

function requestDeleteRepo(uri: string) {
  return kfetch({ pathname: `../api/cs/repo/${uri}`, method: 'delete' });
}

function requestIndexRepo(uri: string) {
  return kfetch({ pathname: `../api/cs/repo/index/${uri}`, method: 'post' });
}

function* handleDeleteRepo(action: Action<string>) {
  try {
    yield call(requestDeleteRepo, action.payload || '');
    yield put(deleteRepoSuccess(action.payload || ''));
  } catch (err) {
    yield put(deleteRepoFailed(err));
  }
}

function* handleIndexRepo(action: Action<string>) {
  try {
    yield call(requestIndexRepo, action.payload || '');
    yield put(indexRepoSuccess(action.payload || ''));
  } catch (err) {
    yield put(indexRepoFailed(err));
  }
}

function requestImportRepo(uri: string) {
  return kfetch({ pathname: '../api/cs/repo', method: 'post', body: JSON.stringify({ url: uri }) });
}

function* handleImportRepo(action: Action<string>) {
  try {
    const data = yield call(requestImportRepo, action.payload || '');
    yield put(importRepoSuccess(data));
  } catch (err) {
    yield put(importRepoFailed(err));
  }
}
function* handleFetchRepoConfigs() {
  try {
    const configs = yield call(requestRepoConfigs);
    yield put(fetchRepoConfigSuccess(configs));
  } catch (e) {
    yield put(fetchRepoConfigFailed(e));
  }
}

function requestRepoConfigs() {
  return kfetch({ pathname: '../api/cs/workspace', method: 'get' });
}

function* handleInitCmd(action: Action<string>) {
  const repoUri = action.payload as string;
  yield call(requestRepoInitCmd, repoUri);
}

function requestRepoInitCmd(repoUri: string) {
  return kfetch({
    pathname: `../api/cs/workspace/${repoUri}/master`,
    query: { force: true },
    method: 'post',
  });
}
function* handleGotoRepo(action: Action<string>) {
  const repoUri = action.payload as string;
  const repo = yield call(requestRepo, repoUri);
  history.push(`${repoUri}/tree/${repo.defaultBranch || 'master'}`);
}

function requestRepo(uri: string) {
  return kfetch({ pathname: `../api/cs/repo${uri}`, method: 'get' });
}

export function* watchImportRepo() {
  yield takeEvery(String(importRepo), handleImportRepo);
}

export function* watchDeleteRepo() {
  yield takeEvery(String(deleteRepo), handleDeleteRepo);
}

export function* watchIndexRepo() {
  yield takeEvery(String(indexRepo), handleIndexRepo);
}

export function* watchFetchRepos() {
  yield takeEvery(String(fetchRepos), handleFetchRepos);
}

export function* watchFetchRepoConfigs() {
  yield takeEvery(String(fetchRepoConfigs), handleFetchRepoConfigs);
}

export function* watchInitRepoCmd() {
  yield takeEvery(String(initRepoCommand), handleInitCmd);
}

export function* watchGotoRepo() {
  yield takeLatest(String(gotoRepo), handleGotoRepo);
}
