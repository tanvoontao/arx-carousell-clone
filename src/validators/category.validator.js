import * as yup from "yup"

const validate = yup.object({
    name: yup.string().min(3).max(30).required(),
    description: yup.string().min(10).max(500).required(),
    images: yup.string().optional().nullable(),
})

export default validate;