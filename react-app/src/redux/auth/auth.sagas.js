import axios from "../../axiosInstance"
import { takeLatest, all, put, call } from "redux-saga/effects"
import { authActionTypes } from "./auth.types"
import {
    signInFailure,
    signInSuccess,
    signOutFailure,
    signOutSuccess,
    signUpFailure,
    signUpSuccess,
} from "./auth.actions"

export function* getSnapshotFromUserAuth(userAuth) {
    try {
        yield sessionStorage.setItem("CUSTOMER_ID", userAuth.customerId)
        yield put(signInSuccess({ id: userAuth.customerId, ...userAuth }))
    } catch (e) {
        yield put(signInFailure(e.message))
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { data } = yield axios.post("signin", { email, password })
        yield getSnapshotFromUserAuth(data[0])
    } catch (e) {
        yield put(signInFailure(e.response.data))
    }
}

export function* checkIfUserIsAuthenticated() {
    try {
        const userAuth = yield sessionStorage.getItem("CUSTOMER_ID")
        if (!userAuth) return
        yield getSnapshotFromUserAuth(userAuth)
    } catch (e) {
        yield put(signInFailure(e.message))
    }
}

export function* signOut() {
    try {
        yield sessionStorage.setItem("CUSTOMER_ID", "")
        yield put(signOutSuccess())
    } catch (e) {
        yield put(signOutFailure(e.message))
    }
}

export function* signUp({ payload: { displayName, email, password } }) {
    try {
        const { data } = yield axios.post("signup", { email, password, displayName })
        yield put(signUpSuccess({ user: data[0] }))
    } catch (e) {
        yield put(signUpFailure(e.response.data))
    }
}

export function* signInAfterSignUp({ payload: { user } }) {
    yield getSnapshotFromUserAuth(user)
}

export function* onCheckUserSession() {
    yield takeLatest(authActionTypes.CHECK_USER_SESSION, checkIfUserIsAuthenticated)
}

export function* onEmailSignInStart() {
    yield takeLatest(authActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignOutStart() {
    yield takeLatest(authActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
    yield takeLatest(authActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(authActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* authSagas() {
    yield all([
        call(onCheckUserSession),
        call(onEmailSignInStart),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
    ])
}
