export {}
// import { functions } from '../../const'

// const bucketName = process.env.FUNCTIONS_EMULATOR ? 'default-bucket' : undefined

/**
 * NOTE:
 * storageで管理するコンテンツの種類が増加し、ifブロックが増えてきたら、
 * コンテンツの種類ごとにbucketを作成して、トリガーをbucketごとに実装する。
 * https://stackoverflow.com/questions/45404270
 */
// export const onFinalize = functions.storage.bucket(bucketName).object().onFinalize((object) => {
//   if(object.contentType?.startsWith('image/')) {
//   }
// })