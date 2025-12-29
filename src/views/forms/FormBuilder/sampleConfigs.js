// // Sample form configurations for testing the Form Builder

// export const sampleFormConfigs = {
//   // Patient Demographics Form
//   patientDemographics: {
//     title: 'Patient Demographics',
//     description: 'Collect basic demographic information about the patient',
//     submitButtonText: 'Save Patient Information',
//     sections: [
//       {
//         title: 'Personal Information',
//         description: 'Basic patient details',
//         fields: ['firstName', 'lastName', 'dateOfBirth', 'gender', 'email', 'phone'],
//       },
//       {
//         title: 'Address Information',
//         description: 'Patient residential address',
//         fields: ['address', 'city', 'state', 'zipCode', 'country'],
//       },
//       {
//         title: 'Medical Information',
//         description: 'Basic medical details',
//         fields: ['bloodType', 'allergies', 'medications', 'emergencyContact'],
//       },
//     ],
//     fields: [
//       {
//         name: 'firstName',
//         type: 'text',
//         label: 'First Name',
//         placeholder: 'Enter first name',
//         required: true,
//         width: 6,
//         validation: {
//           minLength: 2,
//           maxLength: 50,
//         },
//       },
//       {
//         name: 'lastName',
//         type: 'text',
//         label: 'Last Name',
//         placeholder: 'Enter last name',
//         required: true,
//         width: 6,
//         validation: {
//           minLength: 2,
//           maxLength: 50,
//         },
//       },
//       {
//         name: 'dateOfBirth',
//         type: 'date',
//         label: 'Date of Birth',
//         required: true,
//         width: 6,
//       },
//       {
//         name: 'gender',
//         type: 'select',
//         label: 'Gender',
//         placeholder: 'Select gender',
//         required: true,
//         width: 6,
//         options: [
//           { value: 'male', label: 'Male' },
//           { value: 'female', label: 'Female' },
//           { value: 'other', label: 'Other' },
//           { value: 'prefer-not-to-say', label: 'Prefer not to say' },
//         ],
//       },
//       {
//         name: 'email',
//         type: 'email',
//         label: 'Email Address',
//         placeholder: 'patient@example.com',
//         required: true,
//         width: 6,
//         validation: {
//           pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
//           patternMessage: 'Please enter a valid email address',
//         },
//       },
//       {
//         name: 'phone',
//         type: 'tel',
//         label: 'Phone Number',
//         placeholder: '(555) 123-4567',
//         required: true,
//         width: 6,
//         validation: {
//           pattern: '^[0-9]{10}$|^\\([0-9]{3}\\)\\s[0-9]{3}-[0-9]{4}$',
//           patternMessage: 'Please enter a valid phone number',
//         },
//       },
//       {
//         name: 'address',
//         type: 'text',
//         label: 'Street Address',
//         placeholder: '123 Main St',
//         required: true,
//         width: 12,
//       },
//       {
//         name: 'city',
//         type: 'text',
//         label: 'City',
//         placeholder: 'Enter city',
//         required: true,
//         width: 4,
//       },
//       {
//         name: 'state',
//         type: 'text',
//         label: 'State/Province',
//         placeholder: 'Enter state',
//         required: true,
//         width: 4,
//       },
//       {
//         name: 'zipCode',
//         type: 'text',
//         label: 'ZIP/Postal Code',
//         placeholder: '12345',
//         required: true,
//         width: 4,
//         validation: {
//           pattern: '^[0-9]{5}$|^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$',
//           patternMessage: 'Please enter a valid ZIP/Postal code',
//         },
//       },
//       {
//         name: 'country',
//         type: 'select',
//         label: 'Country',
//         required: true,
//         width: 12,
//         options: [
//           { value: 'us', label: 'United States' },
//           { value: 'ca', label: 'Canada' },
//           { value: 'uk', label: 'United Kingdom' },
//           { value: 'au', label: 'Australia' },
//           { value: 'other', label: 'Other' },
//         ],
//       },
//       {
//         name: 'bloodType',
//         type: 'select',
//         label: 'Blood Type',
//         width: 6,
//         options: [
//           { value: 'a-positive', label: 'A+' },
//           { value: 'a-negative', label: 'A-' },
//           { value: 'b-positive', label: 'B+' },
//           { value: 'b-negative', label: 'B-' },
//           { value: 'ab-positive', label: 'AB+' },
//           { value: 'ab-negative', label: 'AB-' },
//           { value: 'o-positive', label: 'O+' },
//           { value: 'o-negative', label: 'O-' },
//         ],
//       },
//       {
//         name: 'allergies',
//         type: 'textarea',
//         label: 'Known Allergies',
//         placeholder: 'List any known allergies',
//         width: 6,
//         rows: 3,
//         helpText: 'Include medications, foods, or environmental allergies',
//       },
//       {
//         name: 'medications',
//         type: 'textarea',
//         label: 'Current Medications',
//         placeholder: 'List current medications',
//         width: 6,
//         rows: 3,
//       },
//       {
//         name: 'emergencyContact',
//         type: 'text',
//         label: 'Emergency Contact',
//         placeholder: 'Name and phone number',
//         required: true,
//         width: 6,
//       },
//     ],
//   },

//   // Adverse Event Report Form
//   adverseEvent: {
//     title: 'Adverse Event Report',
//     description: 'Report and document adverse events during clinical trial',
//     submitButtonText: 'Submit Adverse Event Report',
//     fields: [
//       {
//         name: 'patientId',
//         type: 'text',
//         label: 'Patient ID',
//         placeholder: 'Enter patient ID',
//         required: true,
//         width: 6,
//       },
//       {
//         name: 'eventDate',
//         type: 'datetime-local',
//         label: 'Event Date and Time',
//         required: true,
//         width: 6,
//       },
//       {
//         name: 'eventType',
//         type: 'select',
//         label: 'Event Type',
//         required: true,
//         width: 6,
//         options: [
//           { value: 'serious', label: 'Serious Adverse Event (SAE)' },
//           { value: 'non-serious', label: 'Non-Serious Adverse Event' },
//           { value: 'suspected', label: 'Suspected Unexpected Serious Adverse Reaction (SUSAR)' },
//         ],
//       },
//       {
//         name: 'severity',
//         type: 'radio',
//         label: 'Severity',
//         required: true,
//         width: 6,
//         options: [
//           { value: 'mild', label: 'Mild' },
//           { value: 'moderate', label: 'Moderate' },
//           { value: 'severe', label: 'Severe' },
//           { value: 'life-threatening', label: 'Life-threatening' },
//           { value: 'fatal', label: 'Fatal' },
//         ],
//       },
//       {
//         name: 'eventDescription',
//         type: 'textarea',
//         label: 'Event Description',
//         placeholder: 'Provide detailed description of the adverse event',
//         required: true,
//         width: 12,
//         rows: 5,
//       },
//       {
//         name: 'relatedToStudy',
//         type: 'radio',
//         label: 'Related to Study Treatment',
//         required: true,
//         width: 12,
//         options: [
//           { value: 'definitely', label: 'Definitely Related' },
//           { value: 'probably', label: 'Probably Related' },
//           { value: 'possibly', label: 'Possibly Related' },
//           { value: 'unlikely', label: 'Unlikely Related' },
//           { value: 'not-related', label: 'Not Related' },
//         ],
//       },
//       {
//         name: 'actionTaken',
//         type: 'checkbox',
//         label: 'Actions Taken',
//         width: 12,
//         options: [
//           { value: 'dose-reduced', label: 'Dose Reduced' },
//           { value: 'dose-interrupted', label: 'Dose Interrupted' },
//           { value: 'drug-withdrawn', label: 'Drug Withdrawn' },
//           { value: 'medication-given', label: 'Concomitant Medication Given' },
//           { value: 'hospitalization', label: 'Hospitalization Required' },
//           { value: 'none', label: 'No Action Required' },
//         ],
//       },
//       {
//         name: 'outcome',
//         type: 'select',
//         label: 'Outcome',
//         required: true,
//         width: 6,
//         options: [
//           { value: 'recovered', label: 'Recovered/Resolved' },
//           { value: 'recovering', label: 'Recovering/Resolving' },
//           { value: 'not-recovered', label: 'Not Recovered/Not Resolved' },
//           { value: 'recovered-with-sequelae', label: 'Recovered with Sequelae' },
//           { value: 'fatal', label: 'Fatal' },
//           { value: 'unknown', label: 'Unknown' },
//         ],
//       },
//       {
//         name: 'reporterName',
//         type: 'text',
//         label: 'Reporter Name',
//         placeholder: 'Name of person reporting',
//         required: true,
//         width: 6,
//       },
//       {
//         name: 'reportDate',
//         type: 'date',
//         label: 'Report Date',
//         required: true,
//         width: 6,
//       },
//       {
//         name: 'additionalNotes',
//         type: 'textarea',
//         label: 'Additional Notes',
//         placeholder: 'Any additional relevant information',
//         width: 12,
//         rows: 4,
//       },
//     ],
//   },

//   // Vital Signs Form
//   vitalSigns: {
//     title: 'Vital Signs Assessment',
//     description: 'Record patient vital signs during study visit',
//     submitButtonText: 'Save Vital Signs',
//     fields: [
//       {
//         name: 'patientId',
//         type: 'text',
//         label: 'Patient ID',
//         required: true,
//         width: 6,
//       },
//       {
//         name: 'visitDate',
//         type: 'datetime-local',
//         label: 'Visit Date and Time',
//         required: true,
//         width: 6,
//       },
//       {
//         name: 'temperature',
//         type: 'number',
//         label: 'Temperature (°F)',
//         placeholder: '98.6',
//         required: true,
//         width: 4,
//         validation: {
//           min: 90,
//           max: 110,
//         },
//         helpText: 'Normal range: 97.0-99.0°F',
//       },
//       {
//         name: 'temperatureUnit',
//         type: 'radio',
//         label: 'Temperature Unit',
//         required: true,
//         width: 4,
//         defaultValue: 'fahrenheit',
//         options: [
//           { value: 'fahrenheit', label: '°F' },
//           { value: 'celsius', label: '°C' },
//         ],
//       },
//       {
//         name: 'heartRate',
//         type: 'number',
//         label: 'Heart Rate (bpm)',
//         placeholder: '70',
//         required: true,
//         width: 4,
//         validation: {
//           min: 30,
//           max: 200,
//         },
//         helpText: 'Normal range: 60-100 bpm',
//       },
//       {
//         name: 'systolicBP',
//         type: 'number',
//         label: 'Systolic Blood Pressure (mmHg)',
//         placeholder: '120',
//         required: true,
//         width: 6,
//         validation: {
//           min: 60,
//           max: 250,
//         },
//       },
//       {
//         name: 'diastolicBP',
//         type: 'number',
//         label: 'Diastolic Blood Pressure (mmHg)',
//         placeholder: '80',
//         required: true,
//         width: 6,
//         validation: {
//           min: 40,
//           max: 150,
//         },
//       },
//       {
//         name: 'respiratoryRate',
//         type: 'number',
//         label: 'Respiratory Rate (breaths/min)',
//         placeholder: '16',
//         required: true,
//         width: 4,
//         validation: {
//           min: 8,
//           max: 40,
//         },
//         helpText: 'Normal range: 12-20 breaths/min',
//       },
//       {
//         name: 'oxygenSaturation',
//         type: 'number',
//         label: 'Oxygen Saturation (%)',
//         placeholder: '98',
//         required: true,
//         width: 4,
//         validation: {
//           min: 70,
//           max: 100,
//         },
//         helpText: 'Normal range: 95-100%',
//       },
//       {
//         name: 'weight',
//         type: 'number',
//         label: 'Weight (lbs)',
//         placeholder: '150',
//         width: 4,
//         validation: {
//           min: 50,
//           max: 500,
//         },
//       },
//       {
//         name: 'height',
//         type: 'number',
//         label: 'Height (inches)',
//         placeholder: '68',
//         width: 4,
//         validation: {
//           min: 48,
//           max: 96,
//         },
//       },
//       {
//         name: 'bmi',
//         type: 'number',
//         label: 'BMI',
//         placeholder: 'Auto-calculated',
//         disabled: true,
//         width: 4,
//         helpText: 'Body Mass Index',
//       },
//       {
//         name: 'assessedBy',
//         type: 'text',
//         label: 'Assessed By',
//         placeholder: 'Name of assessor',
//         required: true,
//         width: 6,
//       },
//       {
//         name: 'notes',
//         type: 'textarea',
//         label: 'Notes',
//         placeholder: 'Any additional observations',
//         width: 12,
//         rows: 3,
//       },
//     ],
//   },

//   // Informed Consent Form
//   consentForm: {
//     title: 'Informed Consent Form',
//     description: 'Patient consent for clinical trial participation',
//     submitButtonText: 'Submit Consent',
//     fields: [
//       {
//         name: 'patientName',
//         type: 'text',
//         label: 'Patient Full Name',
//         required: true,
//         width: 6,
//       },
//       {
//         name: 'patientId',
//         type: 'text',
//         label: 'Patient ID',
//         required: true,
//         width: 6,
//       },
//       {
//         name: 'studyTitle',
//         type: 'text',
//         label: 'Study Title',
//         required: true,
//         width: 12,
//       },
//       {
//         name: 'studyPurpose',
//         type: 'checkbox',
//         label: 'I understand the purpose of this study',
//         required: true,
//         width: 12,
//         checkboxLabel: 'I have read and understood the study purpose and procedures',
//       },
//       {
//         name: 'risksUnderstood',
//         type: 'checkbox',
//         label: 'Risks and Benefits',
//         required: true,
//         width: 12,
//         checkboxLabel: 'I understand the potential risks and benefits of participation',
//       },
//       {
//         name: 'voluntaryParticipation',
//         type: 'checkbox',
//         label: 'Voluntary Participation',
//         required: true,
//         width: 12,
//         checkboxLabel: 'I understand that my participation is voluntary and I can withdraw at any time',
//       },
//       {
//         name: 'confidentiality',
//         type: 'checkbox',
//         label: 'Confidentiality',
//         required: true,
//         width: 12,
//         checkboxLabel: 'I understand how my personal information will be protected',
//       },
//       {
//         name: 'dataSharing',
//         type: 'radio',
//         label: 'Data Sharing Consent',
//         required: true,
//         width: 12,
//         options: [
//           { value: 'yes', label: 'I consent to sharing my anonymized data for future research' },
//           { value: 'no', label: 'I do not consent to sharing my data' },
//         ],
//       },
//       {
//         name: 'biologicalSamples',
//         type: 'radio',
//         label: 'Biological Samples',
//         width: 12,
//         options: [
//           { value: 'yes', label: 'I consent to storage of biological samples for future research' },
//           { value: 'no', label: 'I do not consent to sample storage' },
//           { value: 'na', label: 'Not applicable' },
//         ],
//       },
//       {
//         name: 'signature',
//         type: 'text',
//         label: 'Electronic Signature',
//         placeholder: 'Type your full name',
//         required: true,
//         width: 6,
//         helpText: 'By typing your name, you provide your electronic signature',
//       },
//       {
//         name: 'signatureDate',
//         type: 'date',
//         label: 'Date',
//         required: true,
//         width: 6,
//       },
//       {
//         name: 'witnessName',
//         type: 'text',
//         label: 'Witness Name',
//         width: 6,
//       },
//       {
//         name: 'witnessSignature',
//         type: 'text',
//         label: 'Witness Signature',
//         placeholder: 'Type witness name',
//         width: 6,
//       },
//     ],
//   },

//   // Laboratory Results Form
//   labResults: {
//     title: 'Laboratory Results',
//     description: 'Record laboratory test results for clinical trial',
//     submitButtonText: 'Save Lab Results',
//     sections: [
//       {
//         title: 'Test Information',
//         fields: ['patientId', 'testDate', 'laboratoryName', 'testType'],
//       },
//       {
//         title: 'Hematology Panel',
//         fields: [
//           'wbc',
//           'rbc',
//           'hemoglobin',
//           'hematocrit',
//           'plateletCount',
//           'abnormalHematology',
//           'hematologyNotes',
//         ],
//       },
//       {
//         title: 'Chemistry Panel',
//         fields: [
//           'glucose',
//           'creatinine',
//           'bun',
//           'sodium',
//           'potassium',
//           'abnormalChemistry',
//           'chemistryNotes',
//         ],
//       },
//       {
//         title: 'Review and Sign-off',
//         fields: ['reviewedBy', 'reviewDate', 'additionalComments'],
//       },
//     ],
//     fields: [
//       {
//         name: 'patientId',
//         type: 'text',
//         label: 'Patient ID',
//         required: true,
//         width: 6,
//       },
//       {
//         name: 'testDate',
//         type: 'date',
//         label: 'Test Date',
//         required: true,
//         width: 6,
//       },
//       {
//         name: 'laboratoryName',
//         type: 'text',
//         label: 'Laboratory Name',
//         required: true,
//         width: 6,
//       },
//       {
//         name: 'testType',
//         type: 'select',
//         label: 'Test Type',
//         required: true,
//         width: 6,
//         options: [
//           { value: 'baseline', label: 'Baseline' },
//           { value: 'week-4', label: 'Week 4' },
//           { value: 'week-8', label: 'Week 8' },
//           { value: 'week-12', label: 'Week 12' },
//           { value: 'end-of-study', label: 'End of Study' },
//           { value: 'unscheduled', label: 'Unscheduled' },
//         ],
//       },
//       // Hematology fields
//       {
//         name: 'wbc',
//         type: 'number',
//         label: 'WBC (10³/μL)',
//         placeholder: '7.5',
//         width: 4,
//         helpText: 'Normal: 4.5-11.0',
//         validation: {
//           min: 0,
//           max: 50,
//         },
//       },
//       {
//         name: 'rbc',
//         type: 'number',
//         label: 'RBC (10⁶/μL)',
//         placeholder: '4.8',
//         width: 4,
//         helpText: 'Normal: 4.2-5.9',
//         validation: {
//           min: 0,
//           max: 10,
//         },
//       },
//       {
//         name: 'hemoglobin',
//         type: 'number',
//         label: 'Hemoglobin (g/dL)',
//         placeholder: '14.5',
//         width: 4,
//         helpText: 'Normal: 12.0-17.5',
//         validation: {
//           min: 0,
//           max: 25,
//         },
//       },
//       {
//         name: 'hematocrit',
//         type: 'number',
//         label: 'Hematocrit (%)',
//         placeholder: '42',
//         width: 4,
//         helpText: 'Normal: 36-50%',
//         validation: {
//           min: 0,
//           max: 100,
//         },
//       },
//       {
//         name: 'plateletCount',
//         type: 'number',
//         label: 'Platelet Count (10³/μL)',
//         placeholder: '250',
//         width: 4,
//         helpText: 'Normal: 150-400',
//         validation: {
//           min: 0,
//           max: 1000,
//         },
//       },
//       {
//         name: 'abnormalHematology',
//         type: 'checkbox',
//         label: 'Abnormal Hematology Results',
//         checkboxLabel: 'Check if any hematology values are outside normal range',
//         width: 12,
//       },
//       {
//         name: 'hematologyNotes',
//         type: 'textarea',
//         label: 'Hematology Notes',
//         placeholder: 'Additional notes about hematology results',
//         width: 12,
//         rows: 2,
//         condition: {
//           field: 'abnormalHematology',
//           operator: 'equals',
//           value: true,
//         },
//       },
//       // Chemistry fields
//       {
//         name: 'glucose',
//         type: 'number',
//         label: 'Glucose (mg/dL)',
//         placeholder: '95',
//         width: 4,
//         helpText: 'Normal: 70-100',
//         validation: {
//           min: 0,
//           max: 500,
//         },
//       },
//       {
//         name: 'creatinine',
//         type: 'number',
//         label: 'Creatinine (mg/dL)',
//         placeholder: '1.0',
//         width: 4,
//         helpText: 'Normal: 0.6-1.2',
//         validation: {
//           min: 0,
//           max: 15,
//         },
//       },
//       {
//         name: 'bun',
//         type: 'number',
//         label: 'BUN (mg/dL)',
//         placeholder: '15',
//         width: 4,
//         helpText: 'Normal: 7-20',
//         validation: {
//           min: 0,
//           max: 150,
//         },
//       },
//       {
//         name: 'sodium',
//         type: 'number',
//         label: 'Sodium (mEq/L)',
//         placeholder: '140',
//         width: 4,
//         helpText: 'Normal: 135-145',
//         validation: {
//           min: 100,
//           max: 180,
//         },
//       },
//       {
//         name: 'potassium',
//         type: 'number',
//         label: 'Potassium (mEq/L)',
//         placeholder: '4.0',
//         width: 4,
//         helpText: 'Normal: 3.5-5.0',
//         validation: {
//           min: 0,
//           max: 10,
//         },
//       },
//       {
//         name: 'abnormalChemistry',
//         type: 'checkbox',
//         label: 'Abnormal Chemistry Results',
//         checkboxLabel: 'Check if any chemistry values are outside normal range',
//         width: 12,
//       },
//       {
//         name: 'chemistryNotes',
//         type: 'textarea',
//         label: 'Chemistry Notes',
//         placeholder: 'Additional notes about chemistry results',
//         width: 12,
//         rows: 2,
//         condition: {
//           field: 'abnormalChemistry',
//           operator: 'equals',
//           value: true,
//         },
//       },
//       {
//         name: 'reviewedBy',
//         type: 'text',
//         label: 'Reviewed By',
//         placeholder: 'Name of reviewer',
//         required: true,
//         width: 6,
//       },
//       {
//         name: 'reviewDate',
//         type: 'date',
//         label: 'Review Date',
//         required: true,
//         width: 6,
//       },
//       {
//         name: 'additionalComments',
//         type: 'textarea',
//         label: 'Additional Comments',
//         placeholder: 'Any additional observations or comments',
//         width: 12,
//         rows: 3,
//       },
//     ],
//   },
// }
// Sample form configurations for testing the Form Builder

export const sampleFormConfigs = {
  "formId": "clinical_trial_subject_enrollment",
  "title": "Clinical Trial – Subject Enrollment",
  "version": "2.1.0",
  "type": "wizard",
  "saveDraft": true,
  "submit": {
    "label": "Submit Enrollment",
    "api": "/api/clinical/subjects",
    "method": "POST"
  },
  "steps": [
    {
      "stepId": "screening",
      "title": "Screening Information",
      "order": 1,
      "sections": [
        {
          "sectionId": "site_details",
          "title": "Site Details",
          "fields": [
            {
              "id": "siteId",
              "label": "Site ID",
              "type": "select",
              "required": true,
              "dataSource": {
                "type": "api",
                "url": "/api/sites",
                "labelKey": "siteName",
                "valueKey": "siteId"
              }
            },
            {
              "id": "investigatorName",
              "label": "Principal Investigator",
              "type": "text",
              "required": true
            },
            {
              "id": "screeningDate",
              "label": "Screening Date",
              "type": "date",
              "required": true
            }
          ]
        }
      ]
    },

    {
      "stepId": "subject_details",
      "title": "Subject Details",
      "order": 2,
      "sections": [
        {
          "sectionId": "demographics",
          "title": "Demographics",
          "columns": 2,
          "fields": [
            {
              "id": "subjectId",
              "label": "Subject ID",
              "type": "text",
              "required": true,
              "readonly": true
            },
            {
              "id": "age",
              "label": "Age",
              "type": "number",
              "required": true,
              "min": 18,
              "max": 65
            },
            {
              "id": "sex",
              "label": "Sex",
              "type": "select",
              "required": true,
              "options": [
                { "label": "Male", "value": "M" },
                { "label": "Female", "value": "F" }
              ]
            },
            {
              "id": "weight",
              "label": "Weight (kg)",
              "type": "number",
              "required": true
            },
            {
              "id": "height",
              "label": "Height (cm)",
              "type": "number",
              "required": true
            }
          ]
        }
      ]
    },

    {
      "stepId": "medical_history",
      "title": "Medical History",
      "order": 3,
      "sections": [
        {
          "sectionId": "conditions",
          "title": "Existing Conditions",
          "repeatable": true,
          "minRows": 0,
          "maxRows": 10,
          "fields": [
            {
              "id": "conditionName",
              "label": "Condition",
              "type": "text",
              "required": true
            },
            {
              "id": "diagnosedYear",
              "label": "Diagnosed Year",
              "type": "number"
            },
            {
              "id": "isOngoing",
              "label": "Ongoing?",
              "type": "checkbox"
            }
          ]
        }
      ]
    },

    {
      "stepId": "lab_results",
      "title": "Laboratory Results",
      "order": 4,
      "sections": [
        {
          "sectionId": "labs",
          "title": "Baseline Lab Values",
          "type": "table",
          "columns": [
            {
              "id": "testName",
              "label": "Test Name",
              "type": "select",
              "options": [
                { "label": "Hemoglobin", "value": "hb" },
                { "label": "WBC Count", "value": "wbc" },
                { "label": "Platelets", "value": "plt" }
              ]
            },
            {
              "id": "value",
              "label": "Value",
              "type": "number"
            },
            {
              "id": "unit",
              "label": "Unit",
              "type": "text"
            },
            {
              "id": "normalRange",
              "label": "Normal Range",
              "type": "text"
            }
          ],
          "minRows": 1
        }
      ]
    },

    {
      "stepId": "eligibility",
      "title": "Eligibility Criteria",
      "order": 5,
      "sections": [
        {
          "sectionId": "criteria",
          "fields": [
            {
              "id": "meetsInclusion",
              "label": "Meets Inclusion Criteria?",
              "type": "radio",
              "required": true,
              "options": [
                { "label": "Yes", "value": true },
                { "label": "No", "value": false }
              ]
            },
            {
              "id": "exclusionReason",
              "label": "Reason for Exclusion",
              "type": "textarea",
              "conditional": {
                "field": "meetsInclusion",
                "value": false
              }
            }
          ]
        }
      ]
    },

    {
      "stepId": "consent",
      "title": "Informed Consent",
      "order": 6,
      "sections": [
        {
          "sectionId": "consent_upload",
          "fields": [
            {
              "id": "consentSigned",
              "label": "Consent Signed?",
              "type": "checkbox",
              "required": true
            },
            {
              "id": "consentDocument",
              "label": "Upload Signed Consent",
              "type": "file",
              "required": true,
              "accept": ["application/pdf"]
            }
          ]
        }
      ]
    }
  ]
}
