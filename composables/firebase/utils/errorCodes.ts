/**
 * NOTE: firebase v8ではバンドルサイズ増加の懸念や互換性のため、ErrorCodeがexportされていない。
 * よって、プロダクト側で認識するエラーコードはここに定義し、定義されていないエラーコードは例外を投げる。
 * v9へメジャーアップデートするときには、exportされたエラーコードの利用を考える。
 *
 * https://github.com/firebase/firebase-js-sdk/issues/4551
 * https://github.com/firebase/firebase-js-sdk/blob/firebase%408.10.0/packages/auth/src/error_auth.js
 */
export type ErrorCodes =
  | 'auth/wrong-password'
  | 'auth/user-not-found'
  | 'auth/email-already-in-use'
  | 'auth/invalid-email'
