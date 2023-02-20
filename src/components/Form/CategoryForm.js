import axios from "@/config/apis"
import useAxiosFunc from "@/hooks/useAxiosFunc";
import { setAlert } from "@/redux/alert/action";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useRef } from "react";
import getErrorMsg from "@/helper/getErrorMsg";
import validate from "@/validators/category.validator";
import DropZoneUpload from "@/components/Input/DropZoneUpload";
import {
    TextField,
    ButtonGroup,
    Button,
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
import generateUniqueFileName from "@/helper/generateUniqueFileName";
import { useRouter } from 'next/navigation'

const CategoryForm = (props) => {
    const { data } = props
    const router = useRouter()
    const filenamesRef = useRef([]);
    const imagesRef = useRef([]);
    const [category, error, loading, axiosFetch] = useAxiosFunc();
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

    const addNewCategory = async (formValues) => {
        let data = {
            name: formValues.name,
            description: formValues.description,
            images: filenamesRef.current[0]
        }

        const fileData = new FormData()
        fileData.append("imagesss", imagesRef.current[0])
        fileData.append("FileName", filenamesRef.current[0])

        await axiosFetch({
            axios: axios,
            method: 'POST',
            url: '/categories/uploadImg',
            requestConfig: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: fileData
            }
        })

        await axiosFetch({
            axios: axios,
            method: 'POST',
            url: `/categories`,
            requestConfig: {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }
        });
    }

    const editCategory = async (formValues) => {
        let data2 = {
            id: data._id,
            slug: data.slug,
            name: formValues.name,
            description: formValues.description
        }
        if (filenamesRef.current.length != 0) {
            data2.images = filenamesRef.current[0]
        }
        const fileData = new FormData()
        fileData.append("imagesss", imagesRef.current[0])
        fileData.append("FileName", filenamesRef.current[0])

        if (filenamesRef.current.length != 0) {
            await axiosFetch({
                axios: axios,
                method: 'POST',
                url: '/categories/uploadImg',
                requestConfig: {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data: fileData
                }
            })
        }

        await axiosFetch({
            axios: axios,
            method: 'PATCH',
            url: `/categories/${data.slug}`,
            requestConfig: {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data2
            }
        });

    }

    const onSubmit = async (formValues) => {

        await updateFiles()
        if (!data && imagesRef.current?.length > 0) {
            setAlert({ show: false, message: "", severity: "info" })
            await addNewCategory(formValues);
        }
        else if (data) {
            setAlert({ show: false, message: "", severity: "info" })
            await editCategory(formValues)
        }
        else if (!data && imagesRef.current?.length == 0) {
            setAlert({ show: true, message: "Image required", severity: "warning" })
        }
    }


    useEffect(() => {
        if (!loading && !error && category) {
            const message = (data ?
                `You just updated ${data.name}'s details. `
                :
                "You just added a new category! ");
            setAlert({ show: true, message: message, severity: "success" })
            router.push("/admin/dashboard/categories")
        }
        else if (!loading && error) {
            setAlert({ show: true, message: getErrorMsg(error), severity: "error" })
        }


    }, [loading, error, category])


    return (
        <form onSubmit={handleSubmit(data => {
            onSubmit(data);
        })}>
            <Typography variant="h5" >{data ? "Update" : "Create"} Category Form</Typography>

            <TextField
                defaultValue={data ? data.name : ""}
                label="Category Name"
                error={errors?.name && true}
                helperText={errors?.name?.message || "[Slug] Will automatically created behind."}
                fullWidth
                sx={{ mt: 2 }}
                {...register("name")}
            />

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

            <div className="mt-4">
                <DropZoneUpload
                    setImages={setImagesRef}
                    maxFiles={1}
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
                                    {/* <TableCell align="right">Action</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        <Avatar alt={data ? data.images : ""} src={data ? data.images : ""} sx={{ width: 80, height: 80 }} />
                                    </TableCell>
                                    {/* <TableCell align="right">
                                        <Button variant="contained" onClick={() => deleteImg(index)}>❌ Delete</Button>
                                    </TableCell> */}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </div>

            <div className="flex items-center justify-end mt-4">
                <ButtonGroup aria-label="primary button group">
                    <Button variant="outlined" onClick={() => reset()}>{data ? "Reset" : "Clear"}</Button>
                    <Button variant="outlined" type="submit" value="submit" disabled={loading}>{loading ? "🌀 Loading..." : (data ? "Update Now!" : "Add a new Category")}</Button>
                </ButtonGroup>
            </div>


        </form>
    )

}

export default CategoryForm