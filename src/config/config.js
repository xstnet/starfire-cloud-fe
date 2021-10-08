export const UploadStatus = {
    INIT: 0,
    WAIT_UPLOAD: 1,
    PREPARE_UPLOAD: 2,

    UPLOADING: 20,

    SUCCESS: 30,

    CANCEL: 90,
    FAILURE: 91,
}

const Config = {
    CODE_OK: 0,
    CODE_RELOGIN: 27149,

    // BASE_URL: "/api/v1",
    BASE_URL: "/mock/api/v1",
}

export default Config;

