import { notify } from "notiwind"

export default {
    fail(title, text = '') {
        notify({
            group: "fail",
            title,
            text
        }, 4000)
    },
    success(title, text = '') {
        notify({
            group: "success",
            title,
            text,
        }, 4000)

    },
}

