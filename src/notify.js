import { notify } from "notiwind"

export default {
    fail(title, text = '', time = 4000) {
        notify({
            group: "error",
            title,
            text
        }, time)
    },
    success(title, text = '', time = 4000) {
        notify({
            group: "success",
            title,
            text,
        }, time)

    },
}

