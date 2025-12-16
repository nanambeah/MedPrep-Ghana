export interface Question {
  id: number;
  vignette: string;
  options: string[];
  correctAnswerIndex: number; // 0-4
  explanation: string;
  wrongExplanations: string[];
  discipline: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  isSaved?: boolean;
}

export const DISCIPLINES = [
  "Internal Medicine",
  "Surgery",
  "Paediatrics",
  "Obstetrics & Gynaecology",
  "Psychiatry",
  "Ethics"
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    discipline: "Internal Medicine",
    topic: "Infectious Diseases",
    difficulty: "Medium",
    vignette: "A 32-year-old male farmer from the Volta Region presents with a 5-day history of fever, headache, and muscle pain. On examination, he has scleral icterus and conjunctival suffusion. His urine output has decreased significantly over the last 24 hours. Which of the following is the most likely diagnosis?",
    options: [
      "A. Severe Malaria",
      "B. Leptospirosis",
      "C. Yellow Fever",
      "D. Typhoid Fever",
      "E. Acute Viral Hepatitis"
    ],
    correctAnswerIndex: 1,
    explanation: "Leptospirosis (Weil's disease) typically presents with fever, headache, myalgia (classically in the calves), conjunctival suffusion, jaundice, and renal failure (oliguria). The patient's occupation (farmer) is a risk factor due to contact with contaminated water or soil.",
    wrongExplanations: [
      "Malaria can cause fever and jaundice but conjunctival suffusion is less common and renal failure usually presents differently.",
      "Yellow fever presents with fever and jaundice but prominent bleeding diathesis is usually seen; conjunctival suffusion is not a classic hallmark.",
      "Typhoid fever presents with fever and abdominal pain; jaundice and renal failure are rare complications.",
      "Acute Viral Hepatitis presents with jaundice but typically lacks the conjunctival suffusion and severe muscle pain seen in this case."
    ]
  },
  {
    id: 2,
    discipline: "Paediatrics",
    topic: "Neonatology",
    difficulty: "Hard",
    vignette: "A 2-day-old neonate born at term via spontaneous vaginal delivery develops jaundice. The baby is breastfeeding well. Bilirubin levels are elevated, predominantly unconjugated. The mother is blood group O positive and the baby is A positive. What is the most likely cause of the jaundice?",
    options: [
      "A. Physiological Jaundice",
      "B. ABO Incompatibility",
      "C. Breastmilk Jaundice",
      "D. Biliary Atresia",
      "E. G6PD Deficiency"
    ],
    correctAnswerIndex: 1,
    explanation: "Jaundice appearing within the first 24-48 hours is usually pathological. ABO incompatibility occurs when the mother is group O and the baby is A or B. This leads to hemolysis and unconjugated hyperbilirubinemia.",
    wrongExplanations: [
      "Physiological jaundice typically appears after 24 hours and peaks around day 3-4.",
      "Breastmilk jaundice is a late-onset jaundice, usually appearing after the first week.",
      "Biliary atresia presents with conjugated (direct) hyperbilirubinemia and typically later (2 weeks+).",
      "G6PD deficiency is possible but ABO incompatibility is a more direct cause given the blood group mismatch described."
    ]
  },
  {
    id: 3,
    discipline: "Obstetrics & Gynaecology",
    topic: "Obstetric Emergencies",
    difficulty: "Medium",
    vignette: "A 28-year-old G3P2 at 34 weeks gestation presents with sudden onset of painless, bright red vaginal bleeding. She has no abdominal pain or uterine tenderness. Fetal heart rate is 140 bpm. What is the most appropriate initial management step?",
    options: [
      "A. Digital vaginal examination",
      "B. Urgent ultrasound scan",
      "C. Immediate Caesarean section",
      "D. Induction of labour",
      "E. Speculum examination in theatre"
    ],
    correctAnswerIndex: 1,
    explanation: "Painless bright red bleeding in the third trimester suggests Placenta Previa. An ultrasound scan is the diagnostic modality of choice to localize the placenta. Digital vaginal examination is CONTRAINDICATED as it can provoke massive hemorrhage.",
    wrongExplanations: [
      "Digital exam is absolutely contraindicated in suspected placenta previa.",
      "Immediate C-section is only indicated if there is fetal distress or massive hemorrhage causing hemodynamic instability.",
      "Induction of labour is contraindicated in placenta previa.",
      "Speculum exam may be done but ultrasound is the priority to confirm diagnosis first."
    ]
  },
  {
    id: 4,
    discipline: "Surgery",
    topic: "Acute Abdomen",
    difficulty: "Easy",
    vignette: "A 14-year-old boy presents with periumbilical pain that has migrated to the right iliac fossa over the last 12 hours. He has associated anorexia and nausea. On examination, there is tenderness at McBurney's point. What is the most likely diagnosis?",
    options: [
      "A. Acute Pancreatitis",
      "B. Acute Appendicitis",
      "C. Mesenteric Adenitis",
      "D. Renal Colic",
      "E. Testicular Torsion"
    ],
    correctAnswerIndex: 1,
    explanation: "The classic history of migratory pain (periumbilical to RIF), anorexia, nausea, and localized tenderness at McBurney's point is highly specific for Acute Appendicitis.",
    wrongExplanations: [
      "Pancreatitis presents with epigastric pain radiating to the back.",
      "Mesenteric adenitis is a differential but usually follows a viral URTI and fever is more prominent.",
      "Renal colic presents with loin to groin pain.",
      "Testicular torsion presents with acute scrotal pain."
    ]
  },
  {
    id: 5,
    discipline: "Psychiatry",
    topic: "Mood Disorders",
    difficulty: "Medium",
    vignette: "A 30-year-old woman is brought to the clinic by her husband. He reports she has been spending excessive amounts of money, sleeping only 2 hours a night, and talking rapidly for the past week. She believes she has been chosen by God to lead the country. What is the most likely diagnosis?",
    options: [
      "A. Schizophrenia",
      "B. Bipolar I Disorder, Manic Episode",
      "C. Major Depressive Disorder",
      "D. Generalized Anxiety Disorder",
      "E. Borderline Personality Disorder"
    ],
    correctAnswerIndex: 1,
    explanation: "The symptoms of grandiosity (chosen by God), decreased need for sleep, press of speech, and reckless behavior (spending) lasting a week meet the criteria for a Manic Episode, which defines Bipolar I Disorder.",
    wrongExplanations: [
      "Schizophrenia is characterized by chronic delusions and hallucinations without the prominent mood elevation.",
      "Major Depression presents with low mood and anhedonia.",
      "GAD involves excessive worry, not mania.",
      "BPD involves mood instability but not sustained mania for a week with such grandiosity."
    ]
  },
  {
    id: 6,
    discipline: "Obstetrics & Gynaecology",
    topic: "Breast Pathology",
    difficulty: "Medium",
    vignette: "A 57-year-old woman comes to the physician 1 week after noticing a mass in her left breast during breast self-examination. Menopause occurred 6 months ago. She was receiving estrogen therapy but discontinued it 6 weeks ago. Examination shows a 2-cm, palpable, nontender, mobile mass in the upper outer quadrant of the left breast. Which of the following is the most appropriate next step in management?",
    options: [
      "A. Reexamination in 3 months",
      "B. Mammography",
      "C. CT scan of the chest",
      "D. Ductal lavage",
      "E. Mastectomy"
    ],
    correctAnswerIndex: 1,
    explanation: "In a postmenopausal woman with a new breast mass, the priority is to rule out malignancy. Diagnostic mammography is the standard first-line imaging modality to characterize the lesion.",
    wrongExplanations: [
      "Reexamination delays diagnosis of a potential carcinoma.",
      "CT scan is not the primary modality for breast mass evaluation.",
      "Ductal lavage is a screening tool for high risk, not diagnostic for a palpable mass.",
      "Mastectomy is a treatment, not a diagnostic step, and requires biopsy confirmation first."
    ]
  },
  {
    id: 7,
    discipline: "Obstetrics & Gynaecology",
    topic: "Gynaecology",
    difficulty: "Easy",
    vignette: "A 27-year-old nulligravid woman has severe pain with menses that causes her to miss work, and occasional pain during sexual intercourse. Pelvic examination shows minimal endocervical gland eversion and normal uterus, but ovaries are noted. Which of the following is the most likely cause of her condition?",
    options: [
      "A. Chronic appendicitis",
      "B. Endometriosis",
      "C. Pelvic congestion syndrome",
      "D. Polycystic ovarian syndrome",
      "E. Premenstrual syndrome"
    ],
    correctAnswerIndex: 1,
    explanation: "The triad of severe dysmenorrhea (painful periods), dyspareunia (painful sex), and infertility (or nulligravidity in this context implies potential issues) is classic for Endometriosis.",
    wrongExplanations: [
      "Chronic appendicitis usually presents with RLQ pain, not cyclical menstrual pain.",
      "Pelvic congestion syndrome causes dull chronic pelvic pain worsened by standing, not necessarily severe dysmenorrhea.",
      "PCOS presents with oligomenorrhea and hyperandrogenism, not severe pain.",
      "PMS involves mood/somatic symptoms before menses, not severe pelvic pain."
    ]
  },
  {
    id: 8,
    discipline: "Obstetrics & Gynaecology",
    topic: "Infectious Diseases",
    difficulty: "Easy",
    vignette: "A 22-year-old woman presents with pain on urination, intense vaginal itching, and thick odorless curd-like discharge. Wet mount with KOH shows budding yeasts with pseudohyphae. What is the most likely diagnosis?",
    options: [
      "A. Bacterial vaginosis",
      "B. Candidiasis",
      "C. Chlamydia trachomatis infection",
      "D. Lichen sclerosus",
      "E. Trichomoniasis"
    ],
    correctAnswerIndex: 1,
    explanation: "The clinical presentation of 'curd-like' (cottage cheese) discharge, intense itching, and the microscopic finding of budding yeasts and pseudohyphae is diagnostic for Vulvovaginal Candidiasis.",
    wrongExplanations: [
      "Bacterial vaginosis presents with a fishy odor and clue cells, not yeast.",
      "Chlamydia is often asymptomatic or causes mucopurulent discharge, not curd-like.",
      "Lichen sclerosus is a dermatosis causing white plaques and thinning skin, not discharge.",
      "Trichomoniasis presents with frothy, yellow-green, malodorous discharge and motile trichomonads."
    ]
  },
  {
    id: 9,
    discipline: "Obstetrics & Gynaecology",
    topic: "Infertility",
    difficulty: "Medium",
    vignette: "A 27-year-old woman has been unable to conceive for 12 months. She has a history of pelvic inflammatory disease (PID) 4 years ago. Vaginal exam and cervical cultures are normal. What is the most appropriate next step in diagnosis?",
    options: [
      "A. Reevaluation in 6 months",
      "B. Ultrasonography of the abdomen",
      "C. Sperm penetration assay",
      "D. Hysterosalpingography",
      "E. Endometrial biopsy"
    ],
    correctAnswerIndex: 3,
    explanation: "In a patient with a history of PID and infertility, tubal factor infertility (blocked tubes) is a major concern. Hysterosalpingography (HSG) is the standard test to evaluate tubal patency.",
    wrongExplanations: [
      "Waiting longer is inappropriate as she meets the definition of infertility (12 months).",
      "Abdominal ultrasound is less sensitive for tubal patency than HSG.",
      "Sperm penetration assay is an advanced male factor test, not the first step here.",
      "Endometrial biopsy is for luteal phase defect or pathology, not the primary suspicion given the PID history."
    ]
  },
  {
    id: 10,
    discipline: "Obstetrics & Gynaecology",
    topic: "Urogynaecology",
    difficulty: "Medium",
    vignette: "A 42-year-old woman complains of involuntary loss of urine when she coughs, sneezes, or exercises. She has no urge to void before these episodes and no nocturia. Postvoid residual is normal. What is the most likely diagnosis?",
    options: [
      "A. Overactive bladder",
      "B. Overflow incontinence",
      "C. Stress incontinence",
      "D. Urinary tract infection",
      "E. Vesicovaginal fistula"
    ],
    correctAnswerIndex: 2,
    explanation: "Leakage of urine coincident with increased intra-abdominal pressure (coughing, sneezing, exercise) without a preceding urge is classic for Stress Urinary Incontinence.",
    wrongExplanations: [
      "Overactive bladder presents with urgency (sudden strong need to void).",
      "Overflow incontinence involves incomplete emptying and high postvoid residual.",
      "UTI would present with dysuria and frequency.",
      "Vesicovaginal fistula causes continuous leakage, not activity-related."
    ]
  }
];

export const MOCK_STATS = [
  { discipline: "Internal Medicine", correct: 12, total: 15 },
  { discipline: "Surgery", correct: 8, total: 12 },
  { discipline: "Paediatrics", correct: 15, total: 18 },
  { discipline: "Obstetrics & Gynaecology", correct: 5, total: 10 },
  { discipline: "Psychiatry", correct: 9, total: 10 },
];
