import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState, useRef } from "react";
import convertToSlug from "@/helper/convertToSlug";

import {
    TextField,
    ButtonGroup,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar
} from '@mui/material';

import DropZoneUpload from "@/components/Input/DropZoneUpload";

import axios from "@/config/apis"
import useAxios from "@/hooks/useAxios";
import useAxiosFunc from "@/hooks/useAxiosFunc";
import validate from "@/validators/product.validator";


import generateUniqueFileName from "@/helper/generateUniqueFileName";
import getFileNameFromURL from "@/helper/getFileNameFromURL";

import { setAlert } from "@/redux/alert/action";
import { setModal } from "@/redux/modal/action";

import getErrorMsg from "@/helper/getErrorMsg";

const conditions = [
    { value: 'Brand new', label: 'Brand new' },
    { value: 'Like new', label: 'Like new' },
    { value: 'Lightly used', label: 'Lightly used' },
    { value: 'Well used', label: 'Well used' },
    { value: 'Heavily used', label: 'Heavily used' },
]

const ProductForm = (props) => {
    const { data } = props
    const [values, setValues] = useState(data)
    const filenamesRef = useRef([]);
    const imagesRef = useRef([]);

    const [categories] = useAxios({
        axios: axios,
        method: 'GET',
        url: '/categories/all',
        requestConfig: {
            headers: {
                'Content-Type': 'application/json'
            },
        }
    });
    const [product, error, loading, axiosFetch] = useAxiosFunc();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validate)
    });




    const setImagesRef = (newImages) => {
        imagesRef.current = newImages;
    };



    const updateFiles = async () => {
        let newFileNames = imagesRef.current.map((image) => generateUniqueFileName(image.name))

        let newFiles = imagesRef.current.map((file, index) => {
            let newFileName = newFileNames[index];
            let myNewFile = new File([file], newFileName, { type: file.type });
            return myNewFile;
        })

        imagesRef.current = newFiles;
        filenamesRef.current = newFileNames;
    }



    const editProduct = async (formValues) => {
        // take note, not only have formValues, ltr need to combine with existing "values" above
        // since using react-hook-form, the formValues return is only contains text field values
        // therefore, we need to combine the latest images value. 




        const formData = new FormData();

        for (let i = 0; i < filenamesRef.current.length; i++) {
            formData.append("imagesss", imagesRef.current[i]);
        }

        // add form values to formData object
        for (const key in formValues) {
            formData.append(key, formValues[key]);
        }

        // formValues.images = values.images.map(image => getFileNameFromURL(image));


        const newImgs = [
            ...filenamesRef.current,
            ...values.images.map(image => getFileNameFromURL(image))
        ];
        // todo: should put combine the latest images with the ref images
        formData.append("images", JSON.stringify(newImgs));

        await axiosFetch({
            axios: axios,
            method: 'PATCH',
            url: `/products/${data._id}`,
            requestConfig: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            }
        });

    }
    const addNewProduct = async (formValues) => {
        const formData = new FormData();

        for (let i = 0; i < filenamesRef.current.length; i++) {
            formData.append("imagesss", imagesRef.current[i]);
            // formData.append("FileName", filenamesRef.current[i]);
        }

        // add form values to formData object
        for (const key in formValues) {
            formData.append(key, formValues[key]);
        }

        formData.append("images", JSON.stringify(filenamesRef.current));


        await axiosFetch({
            axios: axios,
            method: 'POST',
            url: '/products',
            requestConfig: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            }
        });
    }

    const deleteImg = (index) => {
        // console.log(values.images.filter((image, i) => i !== index))
        setValues({
            ...values,
            images: values.images.filter((image, i) => i !== index)
        });
    };

    const onSubmit = async (formValues) => {
        await updateFiles()
        if (!data && imagesRef.current?.length > 0) {
            setAlert({ show: false, message: "", severity: "info" })
            await addNewProduct(formValues);
        }
        else if (data) {
            setAlert({ show: false, message: "", severity: "info" })
            await editProduct(formValues)
        }
        else if (!data && imagesRef.current?.length == 0) {
            setAlert({ show: true, message: "Image required", severity: "warning" })
        }
    }

    useEffect(() => {
        if (!loading && !error && product) {
            const message = (data ? `You just updated ${data.name}'s details. Please click the refresh data button. ` : "You just added a new product! ");
            setAlert({ show: true, message: message, severity: "success" })
            setModal({ type: null, data: null })
        }
        else if (!loading && error) {
            setAlert({ show: true, message: getErrorMsg(error), severity: "error" })
        }
    }, [loading, error, product])


    return (
        <form onSubmit={handleSubmit(data => {
            onSubmit(data);
        })}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {data ? "Edit Product Form" : "Add New Product Form"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Fill in the form below to {data ? "edit" : "add"} product.
            </Typography>

            <div className="flex items-end w-full justify-between gap-6">
                <div className="w-1/2">
                    <TextField
                        defaultValue={data ? data.name : ""}
                        label="Product Name"
                        error={errors?.name && true}
                        helperText={errors?.name?.message || ""}
                        fullWidth
                        sx={{ mt: 2 }}
                        {...register("name")}
                    />

                </div>
                <div className="w-1/2">
                    <FormControl
                        error={errors?.category && true} fullWidth>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            labelId="category"
                            defaultValue={(data) ? convertToSlug(data.category) : ""}
                            label="Category"
                            inputProps={register('category', {
                                required: 'Please enter currency',
                            })}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                categories?.length != 0 &&
                                categories.map((category) => (
                                    <MenuItem
                                        key={category._id}
                                        value={category.slug}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))}
                        </Select>
                        {errors?.category && <FormHelperText>{errors?.category?.message}</FormHelperText>}

                    </FormControl>

                </div>
            </div>



            <div className="flex items-end w-full justify-between gap-6">
                <div className="w-1/3">
                    <TextField

                        defaultValue={data ? data.brand : ""}
                        label="Brand"
                        name="brand"
                        sx={{ mt: 2 }}
                        fullWidth
                        error={errors?.brand && true}
                        helperText={errors?.brand?.message || ""}
                        {...register("brand")}
                    />
                </div>
                <div className="w-1/3">
                    <TextField
                        defaultValue={data ? data.price : ""}
                        label="Price"
                        name="price"
                        sx={{ mt: 2 }}
                        fullWidth
                        error={errors?.price && true}
                        helperText={errors?.price?.message || ""}
                        {...register("price")}
                    />
                </div>
                <div className="w-1/3">
                    <FormControl
                        error={errors?.condition && true} fullWidth>
                        <InputLabel id="condition">Condition</InputLabel>
                        <Select
                            labelId="condition"
                            defaultValue={data ? data.condition : ""}
                            label="condition"
                            inputProps={register('condition')}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {conditions.map((condition) => (
                                <MenuItem
                                    key={condition.value}
                                    value={condition.value}
                                >
                                    {condition.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors?.condition && <FormHelperText>{errors?.condition?.message}</FormHelperText>}

                    </FormControl>
                </div>
            </div>

            <div>
                <TextField
                    defaultValue={data ? data.location : ""}
                    label="Location"
                    name="location"
                    sx={{ mt: 2 }}
                    fullWidth
                    error={errors?.location && true}
                    helperText={errors?.location?.message || ""}
                    {...register("location")}
                />
            </div>

            <div className="w-full mt-3">
                <DropZoneUpload
                    setImages={setImagesRef}
                    maxFiles={2}
                />

                <br />
                {
                    data &&
                    <TableContainer component={Paper}>
                        <p>If you don't wish to update the image, you may leave it as it is.</p>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {values.images.map((img, index) => (
                                    <TableRow key={img}>
                                        <TableCell component="th" scope="row">
                                            <Avatar alt={img} src={img} sx={{ width: 80, height: 80 }} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button variant="outlined" onClick={() => deleteImg(index)}>❌ Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }


            </div>

            <div>
                <TextField
                    defaultValue={data ? data.description : ""}
                    label="Description"
                    multiline
                    rows={4}
                    sx={{ mt: 2 }}
                    fullWidth
                    error={errors?.description && true}
                    helperText={errors?.description?.message || ""}
                    {...register("description")}
                />
            </div>

            <br />

            <div className="flex items-center justify-end">
                <ButtonGroup aria-label="primary button group">
                    <Button variant="outlined" onClick={() => reset()}>{data ? "Reset" : "Clear"}</Button>
                    <Button variant="outlined" type="submit" value="submit" disabled={loading}>{loading ? "⏳......" : (data ? "Update Now!" : "Add")}</Button>
                </ButtonGroup>
            </div>

        </form>
    )
}

export default ProductForm