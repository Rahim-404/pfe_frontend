import { Container, Typography,Grid,TextField,Box,Paper,Button } from "@mui/material"
import * as Yup from 'yup';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"


function changePasswordAsync(){
    console.log("Password")
}

function handleError(schema, name) {

    if (schema.touched[name] && schema.errors[name]) {
        return schema.errors[name]
    }

    return null
}

export default function Settings ()
{

    const dispatch = useDispatch()

    const {name} = useSelector((state)=>state.login)

    const [changePasswordMessage, setChangePasswordMessage] = useState({})

    const changePasswordSchema = useFormik({
        initialValues: { password: '', new_password: '', confirm_new_password: '' },
        validationSchema: Yup.object({
            password: Yup.string().required("Required."),
            new_password: Yup.string().required("Required."),
            confirm_new_password: Yup.string().when("new_password", {
                is: value => value && value.length > 0,
                then: Yup.string().oneOf(
                    [Yup.ref("new_password")],
                    "Both password need to be the same"
                )
            }),
        }),
        onSubmit: (values) => {
            dispatch(changePasswordAsync(values, () => {
                // success
                setChangePasswordMessage({
                    message: "The password changed with success",
                    type: "success"
                })

                changePasswordSchema.resetForm()
                changePasswordSchema.setSubmitting(false)
            }, (error) => {
                // error
                setChangePasswordMessage({
                    message: error,
                    type: "error"
                })

                changePasswordSchema.setSubmitting(false)
            }))
        }
    })
    return (<Container >
                <Box mt={3}>
                    <Typography textAlign="left" variant="h5" component="h2" fontWeight="bold" gutterBottom >
                        {"Change password admin"}
                    </Typography>
                </Box>
                <Paper sx={{marginTop:4}} >
                    <Box p={2}>
                        <form onSubmit={changePasswordSchema.handleSubmit}>
                            <Grid container  spacing={2}>
                                <Grid container item size={12} alignItems="center">
                                    <Grid item size={4}>
                                        <Typography textAlign="left" variant="subtitle1" gutterBottom component="div">
                                            {"Name"}
                                        </Typography>
                                    </Grid>
                                    <Grid item size={8}>
                                        <TextField
                                            name="name"
                                            value = {name}
                                            disabled
                                            size="small"
                                            fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid container item size={12} alignItems="center">
                                    <Grid item size={4}>
                                        <Typography textAlign="left" variant="subtitle1" gutterBottom component="div">
                                            {"Password"}
                                        </Typography>
                                    </Grid>
                                    <Grid item size={8}>
                                        <TextField
                                            name="password"
                                            value={changePasswordSchema.values.password}
                                            onChange={changePasswordSchema.handleChange}
                                            onBlur={changePasswordSchema.handleBlur}
                                            size="small"
                                            type="password"
                                            error={Boolean(handleError(changePasswordSchema, "password"))}
                                            helperText={handleError(changePasswordSchema, "password")}
                                            fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid container item size={12} alignItems="center">
                                    <Grid item size={4}>
                                        <Typography textAlign="left" variant="subtitle1" gutterBottom component="div">
                                            {"New password"}
                                        </Typography>
                                    </Grid>
                                    <Grid item size={8}>
                                        <TextField
                                            name="new_password"
                                            value={changePasswordSchema.values.new_password}
                                            onChange={changePasswordSchema.handleChange}
                                            onBlur={changePasswordSchema.handleBlur}
                                            size="small"
                                            type="password"
                                            error={Boolean(handleError(changePasswordSchema, "new_password"))}
                                            helperText={handleError(changePasswordSchema, "new_password")}
                                            fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid container item size={12} alignItems="center">
                                    <Grid item  size={4}>
                                        <Typography textAlign="left" variant="subtitle1" gutterBottom component="div">
                                            {"Confirm new password"}
                                        </Typography>
                                    </Grid>
                                    <Grid item size={8}>
                                        <TextField
                                            name="confirm_new_password"
                                            value={changePasswordSchema.values.confirm_new_password}
                                            onChange={changePasswordSchema.handleChange}
                                            onBlur={changePasswordSchema.handleBlur}
                                            size="small"
                                            type="password"
                                            error={Boolean(handleError(changePasswordSchema, "confirm_new_password"))}
                                            helperText={handleError(changePasswordSchema, "confirm_new_password")}
                                            fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid container item size={12} alignItems="center" justifyContent="end">
                                    <Button
                                        variant="contained"
                                        disableElevation
                                        type="submit"
                                        disabled={changePasswordSchema.isSubmitting}>
                                        {"Submit"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Paper>
    </Container>)
}