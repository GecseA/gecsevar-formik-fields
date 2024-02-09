import {Field, Form, Formik} from "formik"
import {Alert, Button, FormGroup, IconButton, InputAdornment, Snackbar} from "@mui/material";
import Box from "@mui/material/Box";
import {ClearIcon, LocalizationProvider} from "@mui/x-date-pickers";
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {GVTextField} from "./components/GVTextField";
import {GVCheckbox} from "./components/GVCheckbox";
import {GVDateTimePicker} from "./components/GVDateTimePicker";
import {GVSelect} from "./components/GVSelect";
import {number, object, string} from "yup";

class TestDataModel {
    id : number = 0
    published : boolean = false
    path = ""
    categories = ""
    categoriesArray : Array<string> = []
    creator : string = ""
    createTime : Date = new Date()
    title : string = ""
    cardImageUrl : string = ""
    bannerImageUrl : string = ""
    description : string = ""
    content : string = ""

}

const formValidationSchema = object({
    testDataModel: object({
        id: number().moreThan(0, "Non zero!"),
        creator: string().required("Non empty!"),
        title: string().max(100),
        description: string().max(150),
        content: string(),
    })
});

export function TestComponent() {

    const articleCategories : Array<string> = ["article", "news", "sport"]

    return <>
        <Formik
            initialValues={{
                testDataModel: new TestDataModel(),
            }}
            onSubmit={(values, actions) => {
                actions.setSubmitting(true)
                // Save
                actions.setSubmitting(false);
            }}
            validationSchema={formValidationSchema}
            validateOnChange={false}    // if true, gets fucking slow ;)
            validateOnBlur={false}
            enableReinitialize={false}
        >
            {({values, handleChange, setFieldValue}) => (
                <Form>
                    <Box>
                        <FormGroup>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Box sx={{display: 'flex', justifyContent: 'center'}} margin={1}>
                                    <Button color={"primary"} variant={"contained"} type={"submit"}>SAVE ARTICLE</Button>
                                </Box>
                                <Box sx={{display: {sm: 'block', md: 'flex'}}} marginTop={1}>
                                    <Field key={1} name={`testDataModel.id`} label={"ID"} component={GVTextField} sx={{width: 50}} disabled/>
                                    <Field key={2} name={`testDataModel.published`} label={"Publish"} component={GVCheckbox}/>
                                    <Field key={3} name={`testDataModel.path`} label={"Path"} component={GVTextField}/>
                                    <Field key={4} name={`testDataModel.creator`} label={"Creator"} component={GVTextField}/>
                                    <Field key={5} name={`testDataModel.createTime`} label={"Create Date/Time"} component={GVDateTimePicker}/>
                                </Box>
                                <Box sx={{width: "maxWidth", display: {sm: 'block', md: 'flex'}}} marginTop={1}>
                                    <Field key={6} name={`testDataModel.title`} label={"Title of the article"}
                                           sx={{minWidth: "400px"}}
                                           component={GVTextField}/>
                                    <Field key={7} name={`testDataModel.categoriesArray`} label={"Categories"} component={GVSelect}
                                           options={articleCategories}
                                           isMultiSelect={true}
                                    />
                                </Box>
                                <Box sx={{display: 'flex'}} marginTop={1}>
                                    <Field key={8} name={`testDataModel.description`} label={"Small description"}
                                           multiline rows={3}
                                           style={{width: "400px", margin: "5px"}}
                                           component={GVTextField}/>
                                    <Field key={9} name={`testDataModel.cardImageUrl`} label={"Mini / Maxi Card image"} component={GVTextField}
                                           InputProps={{
                                               startAdornment: (
                                                   <InputAdornment position="start">
                                                       <IconButton onClick={() => {
                                                           setFieldValue(`testDataModel.cardImageUrl`, "")
                                                       }}>
                                                           <ClearIcon/>
                                                       </IconButton>
                                                   </InputAdornment>
                                               ),
                                               endAdornment: (
                                                   <Button onClick={() => {
                                                   }}>
                                                       <PhotoOutlinedIcon/>
                                                   </Button>
                                               ),
                                           }}
                                    />
                                    <Field key={10} name={`articleModel.bannerImageUrl`} label={"Article top banner image"} component={GVTextField}
                                           InputProps={{
                                               startAdornment: (
                                                   <InputAdornment position="start">
                                                       <IconButton onClick={() => {
                                                           setFieldValue(`articleModel.bannerImageUrl`, "")
                                                       }}>
                                                           <ClearIcon/>
                                                       </IconButton>
                                                   </InputAdornment>
                                               ),
                                               endAdornment: (
                                                   <Button onClick={() => {
                                                   }}>
                                                       <PhotoOutlinedIcon/>
                                                   </Button>
                                               ),
                                           }}
                                    />
                                </Box>
                            </LocalizationProvider>
                        </FormGroup>
                    </Box>
                </Form>
                )}
                </Formik>
                            </>
}