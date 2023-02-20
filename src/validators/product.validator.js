import * as yup from "yup"

const validate = yup.object({
    name: yup.string().required('Product name is required.'),
    price: yup.number()
        .positive('Price must be a positive number.')
        .max(9999, 'Price must be no more than 9999.')
        .required('Price is required.'),
    brand: yup.string().required('Brand is required.'),
    category: yup.string().required('Category is required.'),
    location: yup.string().required('Location is required.'),
    condition: yup.string()
        .oneOf(
            ['Brand new', 'Like new', 'Lightly used', 'Well used', 'Heavily used'],
            'Condition must be one of the allowed values.'
        )
        .required('Condition is required.'),
    description: yup.string().required('Description is required.'),
})

export default validate;