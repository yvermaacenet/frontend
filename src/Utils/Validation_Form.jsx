import * as yup from "yup";
// import AxiosApi, { BaseURL, headersCors } from "./AxiosApi";
// import { mixed } from "yup";
export const user_sign_in_validation = yup.object({
  /*=========> Login Information Validation ==========>*/
  username: yup
    .string()
    // .email("Email should be valid and contain @")
    .required("This field is required"),
  password: yup.string().required("This field is required"),
});
export const user_sign_up_validation = yup.object({
  /*=========> Login Information Validation ==========>*/
  f_name: yup.string().required("This field is required"),
  password: yup.string().required("This field is required"),
  phone: yup.string().required("This field is required"),
  personal_email: yup.string().required("This field is required"),
});
// export const signupValidation = yup.object({
//   saluation: yup.string().notRequired("Please select Saluation"),
//   firstName: yup.string().required("Please Enter First Name"),
//   lastName: yup.string().required("Please Enter Last Name"),
//   phone: yup
//     .string()
//     .required("Please Enter Mobile No")
//     .min(10, "Mobile No Must be 10 characters")
//     .max(10, "Mobile No Must be 10 characters")
//     .matches(/^[0-9]+$/, "Mobile no must be only digits")
//     .test(
//       "Unique Phone No",
//       "Phone no already exists", // <- key, message
//       function (value) {
//         if (value !== "") {
//           return new Promise((resolve, reject) => {
//             //debugger
//             AxiosApi.get(
//               `${BaseURL}/validation/phone/${value}`,
//               headersCors
//             ).then((res) => {
//               resolve(res.data.detail === true ? false : true);
//             });
//           });
//         }
//       }
//     ),
//   email: yup
//     .string()
//     .email("Email should be valid and contain @")
//     .required("Please Enter Email")
//     .test(
//       "Unique Email",
//       "Email ID already exists", // <- key, message
//       function (value) {
//         if (value !== "") {
//           return new Promise((resolve, reject) => {
//             //debugger
//             AxiosApi.get(
//               `${BaseURL}/validation/email/${value}`,
//               headersCors
//             ).then((res) => {
//               resolve(res.data.detail === true ? false : true);
//             });
//           });
//         }
//       }
//     ),
//   password: yup.string().required("Please Enter your password"),
// });
export const addNewClientValidation = yup.object({
  /*=========> Login Information Validation ==========>*/
  client_code: yup.string().required("Please Enter Client Id"),
  name: yup.string().required("Please Enter Client Name"),
});
export const editClientValidation = yup.object({
  /*=========> Login Information Validation ==========>*/
  client_code: yup.string().required("Please Enter Client Id"),
  name: yup.string().required("Please Enter Client Name"),
});

export const addJobValidation = yup.object({
  /*=========> Login Information Validation ==========>*/

  job_title: yup.string().required("Please Enter Job Title"),
  job_desc: yup.string().required("Please Enter Job Description"),
  slug: yup.string().required("Please Enter Slug"),
  // client_id: yup.string().required("Please Select Client"),
  job_type: yup.string().required("Please Select Job Type"),
  min_exp: yup.string().required("Please Enter Min Exp"),
  max_exp: yup.string().required("Please Enter Max Exp"),
  display_order: yup
    .string()
    .required("Please Enter display order")
    .matches(/^[0-9]+$/, "Display order no must be only digits"),

  display_date: yup.string().required("Please Select Date"),
  nice_to_have_jobskill_id: yup
    .string()
    .required("Please Select Nice To Have Job Skills"),
  must_have_jobskill_id: yup
    .string()
    .required("Please Select Must Have Job Skills"),
  city_id: yup.string().required("Please Select City"),
  state_id: yup.string().required("Please Select State"),
  country_id: yup.string().required("Please Select Country"),
});
export const editCandidateValidation = yup.object({
  /*=========> Login Information Validation ==========>*/

  first_name_old: yup.string().required("Please Enter Client Id"),
  address: yup.string().required("Please Enter  Address"),
  zipcode: yup.string().required("Please Enter Zip Code"),
  phone: yup.string().required("Please Enter Phone Number"),
  primary_phone_country_id: yup
    .string()
    .required("Please Choose Primary Phone"),
  phone2: yup.string().required("Please Enter Phone Number"),
  alternate_phone_country_id: yup
    .string()
    .required("Please Choose Alternate Phone"),
  expertise_id: yup.string().required("Please Choose Experties "),
  role: yup.string().required("Please Enter Role"),
  organization: yup.string().required("Please Enter Organization Name"),
});
/*=========> Login Information Validation ==========>*/

export const editCandidateProfileDetailsValidation = yup.object({
  first_name_old: yup.string().required("Please Enter First Name "),
  last_name_old: yup.string().required("Please Enter Last Name "),
  city_id: yup.string().required("Please Select City"),
  state_id: yup.string().required("Please Select State"),
  country_id: yup.string().required("Please Select Country"),
  email2: yup
    .string()
    .notRequired()
    .email("Email should be valid and contain @"),
});
export const editCandidateProfileSummaryValidation = yup.object({
  profile_headline: yup.string().required("Please Enter profile heading "),
  profile_summary: yup.string().required("Please Enter profile summary"),
  industry_id: yup.string().required("Please Enter industry"),
  experience_months: yup
    .string()
    .required("Please Enter experience in month's "),
  experience_years: yup.string().required("Please Enter experience in year's"),
});
export const editCandidateExperienceValidation = yup.object({
  role: yup.string().required("Please Enter Candidate Role"),
  organization: yup.string().required("Please Enter Organization Name"),
  start_month: yup.string().required("Please Enter start month"),
  start_year: yup.string().required("Please Enter start year"),
  // category: yup.string(),
  // .oneOf([true], "You must accept the terms and conditions"),
  end_month: yup.string().when("category", (val, schema) => {
    console.log("category", val);
    if (val === true) {
      return yup.string().notRequired();
    } else return yup.string().required("Please Select End Months");
  }),
  end_year: yup.string().when("category", (val, schema) => {
    if (val === true) {
      return yup.string().notRequired();
    } else return yup.string().required("Please Select End Years");
  }),
});
export const editCandidateEducationValidation = yup.object({
  degree: yup.string().required("Please Enter  specific degree"),
  institute: yup.string().required("Please Enter institution Name"),
  start_month: yup.string().required("Please Enter start month"),
  start_year: yup.string().required("Please Enter start year"),
  category: yup.boolean(),
  // .oneOf([true], "You must accept the terms and conditions"),
  end_month: yup.string().when("category", (val, schema) => {
    if (val === 1) {
      return yup.string().notRequired();
    } else return yup.string().required("Please Select End Months");
  }),
  end_year: yup.string().when("category", (val, schema) => {
    if (val === 2) {
      return yup.string().notRequired();
    } else return yup.string().required("Please Select End Years");
  }),
});
export const editCandidateCertificateValidation = yup.object({
  certification: yup
    .string()
    .required("Please Enter Certification in which???"),
  issuingauthority: yup
    .string()
    .required("Please Enter when authority issuing"),
  issue_month: yup.string().required("Please Enter issuing month"),
  issue_year: yup.string().required("Please Enter issuing year"),
  category: yup.boolean(),
  // .oneOf([true], "You must accept the terms and conditions"),
  expiration_month: yup.string().when("category", (val, schema) => {
    if (val === true) {
      return yup.string().notRequired();
    } else return yup.string().required("Please Select End Months");
  }),
  expiration_year: yup.string().when("category", (val, schema) => {
    if (val === true) {
      return yup.string().notRequired();
    } else return yup.string().required("Please Select End Years");
  }),
});
export const editCandidateSkillsValidation = yup.object({
  abc: yup.string().notRequired(),
});
export const editCandidateDocumentsValidation = yup.object({
  file_type: yup.string().required("Please Select Documents Type"),
  file: yup
    .mixed()
    .test(
      "fileSize",
      "File Size is too large",
      (value) => value[0]?.size <= 1024 * 1024 * 2
    )
    .test("fileType", "Unsupported File Format", (value) =>
      ["application/pdf", "application/msword"].includes(value[0]?.type)
    ),
});
// .shape({ cv_displayname: yup.mixed().required("A file is required") });
// export const editCandidateChargesAvailabilityValidation = yup.object({
//   certification: yup.string().required("Please Enter CAndidate Role"),
//   issuingauthority: yup.string().required("Please Enter Organization Name"),
//   issue_month: yup.string().required("Please Enter Organization Name"),
//   issue_year: yup.string().required("Please Enter Organization Name"),
//   category: yup.boolean(),
//   // .oneOf([true], "You must accept the terms and conditions"),
//   expiration_month: yup.string().when("category", (val, schema) => {
//     if (val === true) {
//       return yup.string().notRequired();
//     } else return yup.string().required("Please Select End Months");
//   }),
//   expiration_year: yup.string().when("category", (val, schema) => {
//     if (val === true) {
//       return yup.string().notRequired();
//     } else return yup.string().required("Please Select End Years");
//   }),
// });

// export const uploadDocumentsValidation = yup.object({
//   cv: yup.string().required("Please Enter Client Id"),
// });

// export const addCandidateValidation = yup.object({
//   /*=========> Login Information Validation ==========>*/

//   first_name_old: yup.string().required("Please Enter First Name"),
//   last_name_old: yup.string().required("Please Enter Last Name"),
//   primary_phone_country_id: yup.string().required("Please Selecy Country Id"),
//   phone: yup
//     .string()
//     .required("Please Enter Phone No")
//     .test(
//       "Unique Phone No",
//       "Phone no already exists", // <- key, message
//       function (value) {
//         if (value !== "") {
//           return new Promise((resolve, reject) => {
//             //debugger
//             AxiosApi.get(
//               `${BaseURL}validation/phone/${value}`,
//               headersCors
//             ).then((res) => {
//               resolve(res.data.detail === true ? false : true);
//             });
//           });
//         }
//       }
//     ),
//   email_old: yup
//     .string()
//     .required("Please Enter Valid Mail ")
//     .test(
//       "Unique Email",
//       "Email ID already exists", // <- key, message
//       function (value) {
//         if (value !== "") {
//           return new Promise((resolve, reject) => {
//             //debugger
//             AxiosApi.get(
//               `${BaseURL}validation/email/${value}`,
//               headersCors
//             ).then((res) => {
//               resolve(res.data.detail === true ? false : true);
//             });
//           });
//         }
//       }
//     ),
//   address: yup.string().required("Please Enter Valid Address"),
//   password: yup.string().required("Please Enter password"),
//   zipcode: yup.string().required("Please Enter Zip Code "),
//   linkedin: yup.string().required("Please Enter Linkedin Profile "),
//   experience_years: yup.string().required("Please Enter Year's of Experience "),
//   experience_months: yup
//     .string()
//     .required("Please Enter Month's of Experience "),
//   profile_summary: yup.string().required("Please Enter Profile Summary "),
//   profile_headline: yup.string().required("Please Enter Profile HeadLine"),
//   phone2: yup.string().required("Please Enter Phone Number "),
//   email2: yup.string().required("Please Enter Valid Mail"),
//   alternate_phone_country_id: yup.string().required("Please Choose Country "),
//   expertise_id: yup.string().required("Please Choose Experties "),
//   role: yup.string().required("Please Enter Role"),
//   organization: yup.string().required("Please Enter Organization Name "),
// });
// export const editJobsValidation = yup.object({
//   /*=========> Login Information Validation ==========>*/

//   title: yup.string().required("Please Enter Title"),
//   slug: yup.string().required("Please Enter Slug"),
//   description: yup.string().required("Please Enter Description "),
//   // client_id: yup.string().required("Please Choose Client Name "),
//   job_type: yup.string().required("Please Choose Job Type"),
//   min_experience: yup.string().required("Please Enter  Minimum Experience"),
//   max_experience: yup.string().required("Please Enter Maximum Experience "),
//   display_order: yup.string().required("Please Enter Display Order "),
//   display_date: yup.string().required("Please Choose date "),
// });
export const form12bb_validation = yup.object({
  /*=========> Login Information Validation ==========>*/
  // name: yup.string().required("This field is required"),
  // email: yup
  //   .string()
  //   .required("This field is required")
  //   .email("Email should be valid and contain @")
  //   .matches(
  //     /[A-Za-z0-9._%+-]+@+(acenet.io|[A-Za-z0-9._%+-])$/,
  //     "Please enter acenet id"
  //   ),
  // // salary_band: yup.string().required("This field is required"),
  // emp_id: yup
  //   .string()
  //   .required("This field is required")
  //   .matches(/^\d*$/, "Employe id must be only numeric"),
  address: yup.string().required("This field is required"),
  permanent_account_number_of_the_employee: yup
    .string()
    .required("This field is required")
    .min(10, "This field must be equal to 10 characters")
    .max(10, "This field must be equal to 10 characters")
    .matches(
      /^(?=.*?\d)(?=.*?[A-Z])[A-Z\d]+$/,
      "This field allows only uppercase alphabetic characters and numerals"
    ),

  houseRentAllowance: yup.string().notRequired(),

  rent_paid_to_the_landlord: yup
    .string()
    .when("houseRentAllowance", (val, schema) => {
      // console.log("eqeqewq", val);
      if (val[0] === "true") {
        return yup
          .string()
          .required("This field is required")
          .matches(/^[0-9]+$/, "This field must be only digits (0-9)");
      } else return yup.string().notRequired();
    }),
  name_of_the_landlord: yup
    .string()
    .when("houseRentAllowance", (val, schema) => {
      if (val[0] === "true") {
        return yup.string().required("This field is required");
      } else return yup.string().notRequired();
    }),
  address_of_the_rental_property: yup
    .string()
    .when("houseRentAllowance", (val, schema) => {
      if (val[0] === "true") {
        return yup.string().required("This field is required");
      } else return yup.string().notRequired();
    }),
  permanent_account_number_of_the_landloard: yup
    .string()
    .when("houseRentAllowance", (val, schema) => {
      if (val[0] === "true") {
        return yup.string().required("This field is required");
      } else return yup.string().notRequired();
    })
    .min(10, "This field must be equal to 10 characters")
    .max(10, "This field must be equal to 10 characters")
    .matches(
      /^(?=.*?\d)(?=.*?[A-Z])[A-Z\d]+$/,
      "This field allows only uppercase alphabetic characters and numerals"
    ),

  leavetravelconcessionsorassistance: yup
    .string()
    .required("This field is required"),

  leave_travel_concessions_or_assistance_amount: yup
    .string()
    .when("leavetravelconcessionsorassistance", (val, schema) => {
      if (val[0] === "true") {
        return yup
          .string()
          .required("This field is required")
          .matches(/^[0-9]+$/, "This field must be only digits (0-9)");
      } else return yup.string().notRequired();
    }),

  deductionofinterestonborrowing: yup
    .string()
    .required("This field is required"),

  interest_payable_paid_to_the_lender: yup
    .string()
    .when("deductionofinterestonborrowing", (val, schema) => {
      if (val[0] === "true") {
        return yup
          .string()
          .required("This field is required")
          .matches(/^[0-9]+$/, "This field must be only digits (0-9)");
      } else return yup.string().notRequired();
    }),
  name_of_the_lender: yup
    .string()
    .when("deductionofinterestonborrowing", (val, schema) => {
      if (val[0] === "true") {
        return yup.string().required("This field is required");
      } else return yup.string().notRequired();
    }),
  address_of_the_lender: yup
    .string()
    .when("deductionofinterestonborrowing", (val, schema) => {
      if (val[0] === "true") {
        return yup.string().required("This field is required");
      } else return yup.string().notRequired();
    }),
  permanent_account_number_of_the_lender: yup
    .string()
    .when("deductionofinterestonborrowing", (val, schema) => {
      if (val[0] === "true") {
        return yup.string().required("This field is required");
      } else return yup.string().notRequired();
    })
    .min(10, "This field must be equal to 10 characters")
    .max(10, "This field must be equal to 10 characters")
    .matches(
      /^(?=.*?\d)(?=.*?[A-Z])[A-Z\d]+$/,
      "This field allows only uppercase alphabetic characters and numerals"
    ),

  father_name: yup.string().required("This field is required"),
  place: yup.string().required("This field is required"),
  designation: yup.string().required("This field is required"),
  // section: yup.string().required("This field is required"),
  // section_type: yup.string().required("This field is required"),
  // section_amount: yup.string().required("This field is required"),
});

export const form_flexible_validation = yup.object({
  // name: yup.string().required("This field is required"),
  // email: yup
  //   .string()
  //   .required("This field is required")
  //   .email("Email should be valid and contain @")
  //   .matches(
  //     /[A-Za-z0-9._%+-]+@+(acenet.io|[A-Za-z0-9._%+-])$/,
  //     "Please enter acenet id"
  //   ),
  // // salary_band: yup.string().required("This field is required"),
  // emp_id: yup
  //   .string()
  //   .required("This field is required")
  //   .matches(/^\d*$/, "Employe id must be only numeric"),
});
