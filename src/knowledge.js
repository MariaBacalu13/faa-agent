// Structured knowledge base of the FAA.ro website
// Source: https://www.faa.ro/ (Facultatea de Administrație și Afaceri, Universitatea din București)

export const SITE_MAP = {
  home: "https://www.faa.ro/",
  about: "https://www.faa.ro/index.php/despre-noi.html",
  studies: "https://www.faa.ro/index.php/studii.html",
  student: "https://www.faa.ro/index.php/pentru-student.html",
  news: "https://www.faa.ro/index.php/stiri.html",
  events: "https://www.faa.ro/index.php/evenimente.html",
  professors: "https://www.faa.ro/index.php/profesori.html",
  contact: "https://www.faa.ro/index.php/contact.html",
  search: "https://www.faa.ro/index.php/cauta.html",
  internships: "https://www.faa.ro/index.php/practica-si-internship.html",

  undergraduate: {
    overview: "https://www.faa.ro/index.php/studii.html",
    admission: "https://www.faa.ro/index.php/studii/admitere-licenta-studii.html",
    admissionPlatform: "https://admitere.faa.unibuc.ro/",
    exam: "https://www.faa.ro/index.php/studii/examen-finalizare-studii-tip-licenta.html",
    programs: {
      publicAdmin: "https://www.faa.ro/index.php/studii/licenta/administratie-publica.html",
      businessAdmin: "https://www.faa.ro/index.php/studii/licenta/administrarea-afacerilor.html",
      marketing: "https://www.faa.ro/index.php/studii/licenta/marketing.html",
      businessAdminEN: "https://www.faa.ro/index.php/studii/licenta/business-administration.html",
      cyberneticsEcon: "https://www.faa.ro/index.php/studii/licenta/cibernetica-economica.html",
      businessAdminFocsani: "https://www.faa.ro/index.php/studii/licenta/administrarea-afacerilor-focsani.html",
      commerceTourismDual: "https://www.faa.ro/index.php/studii/licenta/economia-comertului-turismului-si-serviciilor-dual.html",
    },
  },

  master: {
    admission: "https://www.faa.ro/index.php/studii/admitere-master-studii.html",
    dissertation: "https://www.faa.ro/index.php/studii/examen-finalizare-studii-tip-disertatie.html",
    programs: {
      apesa: "https://www.faa.ro/index.php/studii/master/apesa.html",
      arpam: "https://www.faa.ro/index.php/studii/master/arpam.html",
      appue: "https://www.faa.ro/index.php/studii/master/appue.html",
      adru: "https://www.faa.ro/index.php/studii/master/adru.html",
      mc: "https://www.faa.ro/index.php/studii/master/mc.html",
      apMap: "https://www.faa.ro/index.php/studii/master/ap-map.html",
      apPpecs: "https://www.faa.ro/index.php/studii/master/ap-ppecs.html",
      smomv: "https://www.faa.ro/index.php/studii/master/smomv.html",
      mkMimb: "https://www.faa.ro/index.php/studii/master/mk-mimb.html",
      aamm: "https://www.faa.ro/index.php/studii/master/aamm.html",
      aammEN: "https://www.faa.ro/index.php/studii/master/aamm-en.html",
      ecEN: "https://www.faa.ro/index.php/studii/master/ec-en.html",
      caRO: "https://www.faa.ro/index.php/studii/master/ca-ro.html",
      caEN: "https://www.faa.ro/index.php/studii/master/ca-en.html",
      csAda: "https://www.faa.ro/index.php/studii/master/cs-ada.html",
    },
  },

  doctoral: {
    adminSciences: "https://www.faa.ro/index.php/studii/doctorat/doctorat-stiinte-administrative.html",
    businessAdmin: "https://sites.google.com/faa.unibuc.ro/sdsea/despre-noi?authuser=0",
  },

  postgraduate: {
    eGovernance: "https://www.faa.ro/index.php/studii/postuniversitar/e-guvernare-si-principiile-comunicarii-publice.html",
    entrepreneurship: "https://www.faa.ro/index.php/studii/postuniversitar/antreprenoriat-sustenabil.html",
    capitalMarkets: "https://www.faa.ro/index.php/studii/postuniversitar/fundamentele-institutiilor-si-pietelor-de-capital.html",
    sustainableDev: "https://www.faa.ro/index.php/studii/postuniversitar/expert-dezvoltare-durabila.html",
  },

  facilities: {
    library: "https://www.faa.ro/cercetare-stiintifica",
    scholarships: "https://www.faa.ro/index.php/burse",
    camps: "https://www.faa.ro/index.php/tabere-studentesti",
    dormitory: "https://www.faa.ro/index.php/camin-cazare",
    teacherCert: "https://www.faa.ro/index.php/faa-grade-didactice-preuniversitare",
    research: "https://www.faa.ro/index.php/proiecte-de-cercetare-faa",
    practice: "https://www.faa.ro/index.php/practica-de-specialitate",
    erasmus: "https://www.faa.ro/index.php/mobilitati-erasmus",
    csolub: "https://www.faa.ro/index.php/conferinta-csolub",
    socialResp: "https://www.faa.ro/index.php/responsabilitate-sociala",
    admissionGrades: "https://www.faa.ro/index.php/medii-admitere",
    dataProtection: "https://www.faa.ro/index.php/protectia-datelor",
    civis: "https://www.faa.ro/index.php/civis-faa",
  },

  portals: {
    mopas: "https://mopas-portal.unibuc.ro/",
    moodle: "https://moodle.unibuc.ro/auth/oidc/",
    intranet: "https://unibucro0.sharepoint.com/",
    office365: "https://login.microsoftonline.com",
  },

  external: {
    university: "https://unibuc.ro/",
    csud: "https://doctorat.unibuc.ro/",
    integrity: "https://carfia.unibuc.ro/",
    harassment: "https://docs.google.com/forms/d/e/1FAIpQLSc7tgp485GJEp3dfREcMu_1cBc6ose9hnfP5p5OpITvmnsFuQ/viewform",
    international: "https://unibuc.ro/international/studenti-internationali/",
    studentAssoc: "https://www.asaa-ub.com/",
    oldSite: "https://old.faa.ro/",
    academicCalendar: "https://unibuc.ro/studii/structura-anului-universitar/",
  },

  social: {
    facebook: "https://www.facebook.com/administratieafaceri",
    instagram: "https://www.instagram.com/administratieafaceri",
    whatsapp: "https://wa.me/40768940685",
    linkedin: "https://www.linkedin.com/company/facultatea-de-administra%C8%9Bie-%C8%99i-afaceri/",
  },
};

export const CONTACT = {
  address: {
    bucharest: "B-dul Regina Elisabeta nr. 4-12, etaj 1, sector 3, București, România (în clădirea Facultății de Chimie)",
    focsani: "Strada Republicii, nr. 71, Mun. Focșani (clădirea fostei Prefecturi Putna, etaj 1)",
  },
  email: "secretariat@faa.unibuc.ro",
  phones: [
    "+4 021 305 37 46",
    "+4 0764 438 797",
    "+4 021 305 37 40",
    "+4 0765 543 604",
    "+4 021 305 37 38",
    "+4 0764 355 646",
    "+4 021 305 37 45",
    "+4 0761 068 749",
    "+40 762 484 957",
  ],
  officeHours: "Luni - Joi, orele 12:00 - 14:00 (Monday - Thursday, 12:00 - 14:00)",
  bankAccount: "RO41RNCB0076010452620055 (BCR)",
};

export const UNDERGRADUATE_PROGRAMS = [
  {
    name: "Administrație Publică (Public Administration)",
    language: "ro",
    seats: 250,
    duration: "3 ani (6 semestre)",
    url: SITE_MAP.undergraduate.programs.publicAdmin,
  },
  {
    name: "Administrarea Afacerilor (Business Administration)",
    language: "ro",
    seats: 200,
    duration: "3 ani (6 semestre)",
    url: SITE_MAP.undergraduate.programs.businessAdmin,
  },
  {
    name: "Marketing",
    language: "ro",
    seats: 150,
    duration: "3 ani (6 semestre)",
    url: SITE_MAP.undergraduate.programs.marketing,
  },
  {
    name: "Business Administration (English)",
    language: "en",
    seats: 75,
    duration: "3 ani (6 semestre)",
    url: SITE_MAP.undergraduate.programs.businessAdminEN,
  },
  {
    name: "Cibernetică Economică (Economic Cybernetics)",
    language: "ro",
    seats: 75,
    duration: "3 ani (6 semestre)",
    url: SITE_MAP.undergraduate.programs.cyberneticsEcon,
  },
  {
    name: "Administrarea Afacerilor - Focșani",
    language: "ro",
    seats: 75,
    duration: "3 ani (6 semestre)",
    url: SITE_MAP.undergraduate.programs.businessAdminFocsani,
  },
  {
    name: "Economia Comerțului, Turismului și Serviciilor (dual)",
    language: "ro",
    seats: null,
    duration: "3 ani (6 semestre)",
    url: SITE_MAP.undergraduate.programs.commerceTourismDual,
  },
];

export const MASTER_PROGRAMS = [
  // Administrative Sciences domain
  { name: "APESA — Administrație Publică și Eficientizarea Sistemului Administrativ", domain: "Științe Administrative", language: "ro", url: SITE_MAP.master.programs.apesa },
  { name: "ARPAM — Asistență și Relații Publice în Administrație și Mediul de Afaceri", domain: "Științe Administrative", language: "ro", url: SITE_MAP.master.programs.arpam },
  { name: "APPUE — Administrație Publică și Politici ale Uniunii Europene", domain: "Științe Administrative", language: "ro", url: SITE_MAP.master.programs.appue },
  { name: "ADRU — Administrarea și Dezvoltarea Resurselor Umane", domain: "Științe Administrative", language: "ro", url: SITE_MAP.master.programs.adru },
  { name: "MC — Managementul Crizelor", domain: "Științe Administrative", language: "ro", url: SITE_MAP.master.programs.mc },
  { name: "MAP — Managementul Achizițiilor Publice", domain: "Științe Administrative", language: "ro", url: SITE_MAP.master.programs.apMap },
  { name: "PPECS — Politici Publice Energetice, Climatice și de Sustenabilitate (EN)", domain: "Științe Administrative", language: "en", url: SITE_MAP.master.programs.apPpecs },
  // Marketing domain
  { name: "SMOMV — Strategii de Marketing Online și Managementul Vânzărilor", domain: "Marketing", language: "ro", url: SITE_MAP.master.programs.smomv },
  { name: "MIMB — Innovation Marketing and Brand Management (EN)", domain: "Marketing", language: "en", url: SITE_MAP.master.programs.mkMimb },
  // Business Administration domain
  { name: "AAMM — Administrarea Afacerilor Mici și Mijlocii", domain: "Administrarea Afacerilor", language: "ro", url: SITE_MAP.master.programs.aamm },
  { name: "AAMM-EN — Small & Medium Enterprise Management (EN)", domain: "Administrarea Afacerilor", language: "en", url: SITE_MAP.master.programs.aammEN },
  { name: "EC-EN — Behavioral Economics (EN)", domain: "Administrarea Afacerilor", language: "en", url: SITE_MAP.master.programs.ecEN },
  { name: "CA-RO — Consultanță în Afaceri", domain: "Administrarea Afacerilor", language: "ro", url: SITE_MAP.master.programs.caRO },
  { name: "CA-EN — Business Consulting (EN)", domain: "Administrarea Afacerilor", language: "en", url: SITE_MAP.master.programs.caEN },
  // Cybernetics & Statistics domain
  { name: "ADA — Business Data Analysis (EN)", domain: "Cibernetică și Statistică", language: "en", url: SITE_MAP.master.programs.csAda },
];

export const POSTGRADUATE_PROGRAMS = [
  { name: "E-Guvernare și Principiile Comunicării Publice", url: SITE_MAP.postgraduate.eGovernance },
  { name: "Antreprenoriat sustenabil", url: SITE_MAP.postgraduate.entrepreneurship },
  { name: "Fundamentele instituțiilor și piețelor de capital", url: SITE_MAP.postgraduate.capitalMarkets },
  { name: "Expert Dezvoltare Durabilă", url: SITE_MAP.postgraduate.sustainableDev },
];

export const ADMISSION_INFO = {
  undergraduate: {
    url: SITE_MAP.undergraduate.admission,
    platform: SITE_MAP.undergraduate.admissionPlatform,
    timeline2026: {
      registration: "10-17 iulie 2026 (ora 9:00 – ora 14:00 pe 17 iulie)",
      results: "21 iulie 2026",
      confirmation: "21-25 iulie 2026 (prezență fizică la facultate)",
      finalResults: "27 iulie 2026",
    },
    totalSeats: 825,
    scoring: {
      romanianLiterature: "50% — nota la Limba și literatura română (BAC)",
      electiveDiscipline: "50% — nota la o disciplină la alegere (Economie, Matematică, Sociologie, Psihologie, Filosofie, Istorie, Geografie, Informatică etc.)",
    },
    tiebreaker: [
      "Media generală la examenul de bacalaureat",
      "Nota la Limba și literatura română",
    ],
    fees: {
      registration: "200 lei / program",
      enrollment: "50 lei",
      annualTuition: "5.500 lei",
    },
    requiredDocuments: [
      "Diplomă de bacalaureat (PDF, ambele fețe)",
      "Certificat de naștere",
      "Certificat de căsătorie (dacă e cazul)",
      "Carte de identitate",
      "Adeverință medicală",
      "Dovada plății taxei de înscriere sau scutire",
    ],
    englishProgram: "Eseu motivațional în engleză (max. 1 pagină) — nu e necesar cu certificate Cambridge, Oxford, TOEFL, IELTS sau diplomă bilingvă",
    inPersonAssistance: "B-dul Regina Elisabeta 4-12, Sector 3, București (Luni-Vineri, 9:00-14:00)",
  },
  master: {
    url: SITE_MAP.master.admission,
  },
};

// Schedule (Orar) data from Google Drive
// Source: https://drive.google.com/drive/folders/11BXYbLcMhFJe8oMWxb0gbJT3_N04o8A0
export const SCHEDULES = {
  root: "https://drive.google.com/drive/folders/11BXYbLcMhFJe8oMWxb0gbJT3_N04o8A0",

  undergraduate: {
    folder: "https://drive.google.com/drive/folders/1AF8dzqkUqJI6iS2l9udk23VeuB086v8P",
    sem1: {
      folder: "https://drive.google.com/drive/folders/1c0G6LxCbzFIpsWwo177lgn9m4IFInEiT",
      files: [
        // Administrarea Afacerilor (AA) — years 1-3
        "AA1.pdf", "AA2.pdf", "AA3.pdf",
        // Administrarea Afacerilor Focșani (AAF) — years 1-3
        "AAF1.pdf", "AAF2.pdf", "AAF3.pdf",
        // Administrație Publică (AP) — years 1-3
        "AP1.pdf", "AP2.pdf", "AP3.pdf",
        // Business Administration EN (BA) — years 1-3
        "BA1.pdf", "BA2.pdf", "BA3.pdf",
        // Cibernetică Economică (CE) — years 1-3
        "CE1.pdf", "CE2.pdf", "CE3.pdf",
        // Marketing (MK) — years 1-3
        "MK1.pdf", "MK2.pdf", "MK3.pdf",
      ],
      roomLegend: "Legenda salilor semestrul I anul univ 25-26.xlsx",
    },
    sem2: {
      folder: "https://drive.google.com/drive/folders/1NSQsX4HiQaGFrbmjkQ32Ei099q303pgt",
      files: [
        "Orar sem 2 25_26 lucru - AA1.pdf", "Orar sem 2 25_26 lucru - AA2.pdf", "Orar sem 2 25_26 lucru - AA3.pdf",
        "Orar AAF sem II 25_26 - AAF1.pdf", "Orar AAF sem II 25_26_distribuit - AAF2.pdf", "Orar AAF sem II 25_26_distribuit - AAF3.pdf",
        "Orar sem 2 25_26 lucru - AP1.pdf", "Orar sem 2 25_26 lucru - AP2.pdf", "Orar sem 2 25_26 lucru - AP3.pdf",
        "Orar sem 2 25_26 lucru - BA1.pdf", "Orar sem 2 25_26 lucru - BA2.pdf", "Orar sem 2 25_26 lucru - BA3.pdf",
        "Orar sem 2 25_26 lucru - CE1.pdf", "Orar sem 2 25_26 lucru - CE2.pdf", "Orar sem 2 25_26 lucru - CE3.pdf",
        "Orar sem 2 25_26 lucru - MK1.pdf", "Orar sem 2 25_26 lucru - MK2.pdf", "Orar sem 2 25_26 lucru - MK3.pdf",
      ],
      roomLegend: "Legenda salilor semestrul II anul univ 25-26.xlsx",
    },
    groups: {
      folder: "https://drive.google.com/drive/folders/1HeofHVrnbxk3HIoZTJrnNqXkbNSfXTEa",
      subfolders: [
        "Administrarea Afacerilor",
        "Administrarea Afacerilor (in limba engleza)",
        "Administrarea Afacerilor - Focsani",
        "Administratie Publica",
        "Cibernetica economica",
        "Marketing",
      ],
    },
  },

  master: {
    folder: "https://drive.google.com/drive/folders/1FDYBi-TWD5jCk7Cy3VKsfw53y3GsG2qG",
    sem1: {
      folder: "https://drive.google.com/drive/folders/1b8gtRtADtMxiN3aF2PLab16KX7dafAWJ",
      files: [
        // Administrarea Afacerilor domain
        "AAMM1.pdf", "AAMM2.pdf",  // Administrarea Afacerilor Mici și Mijlocii
        "CA1.pdf", "CA2.pdf",      // Consultanță în Afaceri
        "SMSBA1.pdf",              // Small & Medium-Sized Business Administration
        "BE1.pdf", "BE2.pdf",      // Behavioral Economics
        "BC1.pdf", "BC2.pdf",      // Business Consulting
        // Marketing domain
        "SMOMV1.pdf", "SMOMV2.pdf", // Strategii de Marketing Online
        "MIMB1.pdf",               // Innovation Marketing and Brand Management
        // Administrative Sciences domain
        "APESA1.pdf", "APESA2.pdf",
        "ARPAM1.pdf", "ARPAM2.pdf",
        "APPUE1.pdf", "APPUE2.pdf",
        "ADRU1.pdf", "ADRU2.pdf",
        "MC1.pdf", "MC2.pdf",
        "MAP1.pdf", "MAP2.pdf",
        "PPECCS1.pdf",
        // Cybernetics & Statistics
        "ADA1.pdf", "ADA2.pdf",
      ],
      roomLegend: "Legenda salilor semestrul I anul univ 25-26.xlsx",
    },
    sem2: {
      folder: "https://drive.google.com/drive/folders/1Y0MzP_jBls0RYye2idDIU7HkeOLet5bV",
      files: [
        "Orar sem 2 25_26 lucru - AAMM1.pdf", "Orar sem 2 25_26 lucru - AAMM2.pdf",
        "Orar sem 2 25_26 lucru - ADA1.pdf", "Orar sem 2 25_26 lucru - ADA2.pdf",
        "Orar sem 2 25_26 lucru - ADRU1.pdf", "Orar sem 2 25_26 lucru - ADRU2.pdf",
        "Orar sem 2 25_26 lucru - APESA1.pdf", "Orar sem 2 25_26 lucru - APESA2.pdf",
        "Orar sem 2 25_26 lucru - APPUE1.pdf", "Orar sem 2 25_26 lucru - APPUE2.pdf",
        "Orar sem 2 25_26 lucru - ARPAM1.pdf", "Orar sem 2 25_26 lucru - ARPAM2.pdf",
        "Orar sem 2 25_26 lucru - BC1.pdf", "Orar sem 2 25_26 lucru - BC2.pdf",
        "Orar sem 2 25_26 lucru - BE1.pdf", "Orar sem 2 25_26 lucru - BE2.pdf",
        "Orar sem 2 25_26 lucru - CA1.pdf", "Orar sem 2 25_26 lucru - CA2.pdf",
        "Orar sem 2 25_26 lucru - MAP1.pdf", "Orar sem 2 25_26 lucru - MAP2.pdf",
        "Orar sem 2 25_26 lucru - MC1.pdf", "Orar sem 2 25_26 lucru - MC2.pdf",
        "Orar sem 2 25_26 lucru - MIMB1.pdf",
        "Orar sem 2 25_26 lucru - PPECCS1.pdf",
        "Orar sem 2 25_26 lucru - SMOMV1.pdf", "Orar sem 2 25_26 lucru - SMOMV2.pdf",
        "Orar sem 2 25_26 lucru - SMSBA1.pdf",
      ],
      roomLegend: "Legenda salilor semestrul II anul univ 25-26.xlsx",
    },
    groups: {
      folder: "https://drive.google.com/drive/folders/1cedKL4maxin6tjZkAB3Yw-RB8tXS912Z",
      subfolders: ["ADA", "Administrarea_Afacerilor", "MARKETING", "Stiinte administrative"],
    },
  },

  doctoral: {
    folder: "https://drive.google.com/drive/folders/1kUyfJONlQBTvaawPdJ-NXVYHSK_2iH52",
    sem2: {
      files: ["Orar sem 2 - SDAA.pdf", "Orar sem 2 - SDSA.pdf"],
    },
  },

  postgraduate: {
    folder: "https://drive.google.com/drive/folders/1X1IC2_XlBUXa7jKbGI_alK5binlPuUYh",
    // Currently empty
  },

  // Map abbreviations to full program names for lookup
  abbreviations: {
    // Undergraduate
    AA: "Administrarea Afacerilor",
    AAF: "Administrarea Afacerilor — Focșani",
    AP: "Administrație Publică",
    BA: "Business Administration (EN)",
    CE: "Cibernetică Economică",
    MK: "Marketing",
    // Master
    AAMM: "Administrarea Afacerilor Mici și Mijlocii",
    ADA: "Business Data Analysis (EN)",
    ADRU: "Administrarea și Dezvoltarea Resurselor Umane",
    APESA: "Administrație Publică și Eficientizarea Sistemului Administrativ",
    APPUE: "Administrație Publică și Politici ale Uniunii Europene",
    ARPAM: "Asistență și Relații Publice în Administrație și Mediul de Afaceri",
    BC: "Business Consulting (EN)",
    BE: "Behavioral Economics (EN)",
    CA: "Consultanță în Afaceri",
    MAP: "Managementul Achizițiilor Publice",
    MC: "Managementul Crizelor",
    MIMB: "Innovation Marketing and Brand Management (EN)",
    PPECCS: "Politici Publice Energetice, Climatice și de Sustenabilitate (EN)",
    SMOMV: "Strategii de Marketing Online și Managementul Vânzărilor",
    SMSBA: "Small & Medium-Sized Business Administration (EN)",
    // Doctoral
    SDAA: "Școala Doctorală Administrarea Afacerilor",
    SDSA: "Școala Doctorală Științe Administrative",
  },
};

export const DEPARTMENTS = [
  { name: "Departamentul de Administrarea Afacerilor (DAA)", url: "https://www.faa.ro/index.php/profesori-daa.html" },
  { name: "Departamentul de Administrație Publică (DAP)", url: "https://www.faa.ro/index.php/profesori-dap.html" },
  { name: "Departamentul de Economie Aplicată și Analiză Cantitativă (DEAAC)", url: "https://www.faa.ro/index.php/profesori-deaac.html" },
];

// Complete professor directory — every professor with their profile page URL
// URL pattern: https://www.faa.ro/index.php/profesori-{dept}/{slug}.html
export const PROFESSORS = {
  // ── DAA — Departamentul de Administrarea Afacerilor (21) ──
  daa: {
    department: "Administrarea Afacerilor (DAA)",
    listUrl: "https://www.faa.ro/index.php/profesori-daa.html",
    members: [
      { name: "AVRAM Emanuela Maria", slug: "avram-emanuela-maria" },
      { name: "CATANĂ Ștefan Alexandru", slug: "catana-stefan-alexandru" },
      { name: "COJOCARU Camelia Mariana", slug: "cojocaru-camelia-mariana" },
      { name: "CONSTANTIN Ionuț", slug: "constantin-ionut" },
      { name: "CONȚU Eleonora Gabriela", slug: "contu-eleonora" },
      { name: "DIȚOIU Cristian", slug: "ditoiu-cristian" },
      { name: "GRĂDINARU Cătălin", slug: "gradinaru-catalin" },
      { name: "GRIGORE Ana Maria", slug: "grigore-ana-maria" },
      { name: "HERMAN Radu", slug: "herman-radu" },
      { name: "IONESCU Vladimir-Codrin", slug: "ionescu-vladimir-codrin" },
      { name: "IORDACHE-PLATIS Magdalena", slug: "iordache-platis-magdalena" },
      { name: "JOSAN Ioana Julieta", slug: "josan-ioana-julieta" },
      { name: "NISTOR Cornelia", slug: "nistor-cornelia" },
      { name: "OLTEANU Cosmin Cătălin", slug: "olteanu-cosmin-catalin" },
      { name: "POPESCU Cristian George", slug: "popescu-cristian" },
      { name: "POPESCU Cristina Raluca", slug: "popescu-cristina" },
      { name: "STROE Mihaela Andreea", slug: "stroe-mihaela-andreea" },
      { name: "SURUGIU Camelia", slug: "surugiu-camelia" },
      { name: "ȚÎRCĂ Diana Mihaela", slug: "tirca-diana-mihaela" },
      { name: "TOMA Sorin George", slug: "toma-sorin-george" },
      { name: "VEITH Cristina", slug: "veith-cristina" },
    ],
  },
  // ── DAP — Departamentul de Administrație Publică (19) ──
  dap: {
    department: "Administrație Publică (DAP)",
    listUrl: "https://www.faa.ro/index.php/profesori-dap.html",
    members: [
      { name: "ALIGICĂ Dragoș", slug: "aligica-dragos" },
      { name: "ANDREESCU Liviu", slug: "andreescu-liviu" },
      { name: "ARDELEANU Anca Monica", slug: "ardeleanu-anca-monica" },
      { name: "BONCIU Cătălina Ioana", slug: "bonciu-catalina" },
      { name: "BURCEA Marin", slug: "burcea-marin" },
      { name: "CIMPOERU Dan", slug: "cimpoeru-dan" },
      { name: "DINESCU Raluca", slug: "dinescu-raluca" },
      { name: "DOBROTĂ Carmen", slug: "dobrota-carmen" },
      { name: "GRECU Alexandra", slug: "grecu-alexandra" },
      { name: "GRUIA Karina Andreea", slug: "gruia-karina-andreea" },
      { name: "ISPAS Gabriel Liviu", slug: "ispas-gabriel-liviu" },
      { name: "MIHĂILĂ Viorel", slug: "mihaila-viorel" },
      { name: "PARASCHIV Cristina Marilena", slug: "paraschiv-cristina" },
      { name: "RĂDULESCU Corina Manuela", slug: "radulescu-corina-manuela" },
      { name: "RAIU Cătălin", slug: "raiu-catalin" },
      { name: "SPASICI Camelia", slug: "spasici-camelia" },
      { name: "VOICU Mălina", slug: "voicu-malina" },
      { name: "VOLACU Alexandru", slug: "volacu-alexandru" },
      { name: "ZULEAN Marian", slug: "zulean-marian" },
    ],
  },
  // ── DEAAC — Departamentul de Economie Aplicată și Analiză Cantitativă (23) ──
  deaac: {
    department: "Economie Aplicată și Analiză Cantitativă (DEAAC)",
    listUrl: "https://www.faa.ro/index.php/profesori-deaac.html",
    members: [
      { name: "BĂLĂCEANU Cristina Teodora", slug: "balaceanu-cristina-teodora" },
      { name: "BOGHICEVICI Claudia", slug: "boghicevici-claudia" },
      { name: "BRATU Anca", slug: "bratu-anca" },
      { name: "BUCUR-ARDELEAN Andreea", slug: "bucur-ardelean-andreea" },
      { name: "COJOCARU Silviu Ștefan Traian", slug: "cojocaru-silviu-stefan-traian" },
      { name: "DINCĂ Dragoș", slug: "dinca-dragos" },
      { name: "DRĂGULĂNESCU Irina-Virginia", slug: "dragulanescu-irina-virginia" },
      { name: "DRUICĂ Elena Nolica", slug: "druica-elena" },
      { name: "HUDEA Oana Simona", slug: "hudea-oana-simona" },
      { name: "IANOLE-CĂLIN Rodica", slug: "ianole-calin-rodica" },
      { name: "IMBRIȘCĂ Cosmin Ionuț", slug: "imbrisca-cosmin" },
      { name: "IONESCU Stefan-Alexandru", slug: "ionescu-stefan-alexandru" },
      { name: "JULA Marius", slug: "jula-marius" },
      { name: "LEOVEANU Valentin Mihai", slug: "leoveanu-valentin" },
      { name: "NECULA Marian", slug: "necula-marian-2" },
      { name: "OANCEA Bogdan", slug: "oancea-bogdan" },
      { name: "PAPUC Răzvan Mihail", slug: "papuc-razvan-mihail" },
      { name: "PĂUN Mihaela-Marinela", slug: "paun-mihaela" },
      { name: "PUIU Ionela-Andreea", slug: "puiu-ionela-andreea" },
      { name: "ROȘU Maria-Magdalena", slug: "rosu-maria-magdalena" },
      { name: "SANDU Mihaela Cornelia", slug: "sandu-mihaela-cornelia" },
      { name: "SIMIONESCU Mihaela", slug: "simionescu-mihaela" },
      { name: "VÂLSAN Călin", slug: "valsan-calin" },
    ],
  },
  // ── Emeriti (2) ──
  emeriti: {
    department: "Profesori Emeriți",
    listUrl: "https://www.faa.ro/index.php/profesori-emeriti.html",
    members: [
      { name: "CORNESCU Viorel", slug: "cornescu-viorel" },
      { name: "MARINESCU Paul", slug: "marinescu-paul" },
    ],
  },
  // ── Former professors ──
  fosti: {
    department: "Foști Profesori",
    listUrl: "https://www.faa.ro/index.php/fosti-profesori.html",
    members: [],
  },
};

/**
 * Build a professor profile URL from department key and slug.
 * e.g. buildProfessorUrl("deaac", "jula-marius")
 *   → "https://www.faa.ro/index.php/profesori-deaac/jula-marius.html"
 */
export function buildProfessorUrl(dept, slug) {
  return `https://www.faa.ro/index.php/profesori-${dept}/${slug}.html`;
}

/**
 * Search professors by name (case-insensitive partial match).
 * Returns array of { name, department, url }.
 */
export function findProfessor(query) {
  const q = query.toLowerCase();
  const results = [];
  for (const [dept, data] of Object.entries(PROFESSORS)) {
    for (const prof of data.members) {
      if (prof.name.toLowerCase().includes(q)) {
        results.push({
          name: prof.name,
          department: data.department,
          url: buildProfessorUrl(dept, prof.slug),
        });
      }
    }
  }
  return results;
}

// Hidden/deep routes not in the main navigation menu
export const DEEP_ROUTES = {
  // ── About section sub-pages ──
  aboutSubpages: {
    leadership: "https://www.faa.ro/index.php/despre-noi/conducerea-facultatii.html",
    regulations: "https://www.faa.ro/index.php/despre-noi/regulamente.html",
    regulationsDrive: "https://drive.google.com/drive/folders/14dNfYt2N2xCaWs_DQie-UjodYPOT6Lto",
    council: "https://www.faa.ro/index.php/consiliul-facultatii.html",
    commissions: "https://www.faa.ro/index.php/despre-noi/comisii-faa.html",
    elections: "https://www.faa.ro/index.php/despre-noi/alegeri-2023-2028.html",
    strategy: "https://www.faa.ro/index.php/despre-noi/strategia-faa.html",
    operationalPlan: "https://www.faa.ro/index.php/despre-noi/plan-operational-2021.html",
    reports: "https://www.faa.ro/index.php/despre-noi/raportari-faa.html",
    teachingContests: "https://www.faa.ro/index.php/despre-noi/concursuri-cadre-didactice.html",
    meritGrades: "https://www.faa.ro/index.php/despre-noi/gradatii-de-merit.html",
    selfEvaluation: "https://www.faa.ro/index.php/despre-noi/autoevaluare-cadre-didactice.html",
    scientificResearch: "https://www.faa.ro/index.php/cercetare-stiintifica-detaliu.html",
  },

  // ── Department pages (separate from professor listings) ──
  departments: {
    daa: "https://www.faa.ro/index.php/departament_administrarea_afacerilor.html",
    dap: "https://www.faa.ro/index.php/departament_administratie_publica.html",
    deaac: "https://www.faa.ro/index.php/departament_economie_aplicata_si_analiza_cantitativa.html",
  },

  // ── Student resources (deep links) ──
  studentDeep: {
    fees: "https://www.faa.ro/index.php/stiri/taxe-faa-ub-2.html",
    internationalScholarships: "https://www.faa.ro/index.php/burse/informatii-burse-internationale.html",
    library: "https://www.faa.ro/index.php/stiri/502-biblioteca",
    facebookGroups: "https://www.faa.ro/index.php/stiri/614-grupuri-facebook-studenti",
    passwordReset: "https://www.faa.ro/index.php/stiri/1001-procedura-resetare-parola-si-deblocare-cont-institutional-office-365-si-moodle-ub",
    senateRepresentatives: "https://www.faa.ro/index.php/stiri/reprezentantii-facultatii-in-senatul-universitatii.html",
  },

  // ── Study level parent pages ──
  studyLevels: {
    licenta: "https://www.faa.ro/index.php/studii/licenta.html",
    master: "https://www.faa.ro/index.php/studii/master.html",
    doctorat: "https://www.faa.ro/index.php/studii/doctorat.html",
    postuniversitar: "https://www.faa.ro/index.php/studii/postuniversitar.html",
  },

  // ── Program sub-page patterns (each undergrad program has these) ──
  // Pattern: /index.php/studii/licenta/{program-slug}/descriere-{code}.html
  //          /index.php/studii/licenta/{program-slug}/profesori.html
  //          /index.php/studii/licenta/{program-slug}/planuri-de-invatamant-si-fise-discipline.html
  programSubpages: {
    ap: {
      description: "https://www.faa.ro/index.php/studii/licenta/administratie-publica/descriere-ap.html",
      professors: "https://www.faa.ro/index.php/studii/licenta/administratie-publica/profesori.html",
      curriculum: "https://www.faa.ro/index.php/studii/licenta/administratie-publica/planuri-de-invatamant-si-fise-discipline.html",
    },
    // SMOMV master has sub-pages too
    smomv: {
      description: "https://www.faa.ro/index.php/studii/master/smomv/descriere-smomv.html",
      admission: "https://www.faa.ro/index.php/studii/master/smomv/admitere-smomv.html",
      professors: "https://www.faa.ro/index.php/studii/master/smomv/profesori-smomv.html",
      curriculum: "https://www.faa.ro/index.php/studii/master/smomv/planuri-invatamant-smomv.html",
      courseSheets: "https://www.faa.ro/index.php/studii/master/smomv/fise-disciplina-smomv.html",
      events: "https://www.faa.ro/index.php/studii/master/smomv/evenimente-smomv.html",
    },
  },
};

// Exam information — complete structure from faa.ro + Google Drive
export const EXAMS = {
  undergraduate: {
    page: "https://www.faa.ro/index.php/studii/examen-finalizare-studii-tip-licenta.html",
    driveFolder: "https://drive.google.com/drive/folders/1Y4rgoTNU1aDTVpbbpx9Fk2BcaZ1EcoQY",
    session2026: {
      name: "Sesiunea Iunie-Iulie 2026",
      registration: {
        dates: [
          "22 iunie 2026 — Administrație Publică, Business Administration, Cibernetică Economică, AA Focșani",
          "23 iunie 2026 — Administrație Publică, Marketing",
          "24 iunie 2026 — Marketing, Administrarea Afacerilor",
          "25 iunie 2026 — Administrarea Afacerilor",
        ],
        hours: "Luni - Vineri, 09:00 - 14:00",
      },
      writtenExam: "29 iunie 2026, ora 09:00 - 12:00 (toate programele)",
      thesisDefense: {
        AP: "01 iulie 2026, ora 09:00",
        BA: "02 iulie 2026, ora 09:00",
        CE: "03 iulie 2026, ora 09:00",
        // AA, MK dates on the page too
      },
    },
    tematica: {
      folder: "https://drive.google.com/drive/folders/1bTtPZsbCyPBA3SVC4DDkiyLCmIwcquO-",
      files: {
        AA: "2.1. AA Tematică și Bibliografie Examen Licență.docx",
        AP: "2.2. AP Tematica si Bibliografie Examen Licenta.docx",
        BA: "2.3. BA Tematică și Bibliografie Examen Licență.docx",
        CE: "2.4. CE Tematică și Bibliografie Examen Licență.docx",
        MK: "2.5. MK Tematică și Bibliografie Examen Licență.docx",
      },
    },
    forms: {
      AA: "https://drive.google.com/drive/folders/1-Fw2dZiY4q_qsJ7Bug_PlrY3j3QyzXlm",
      AP: "https://drive.google.com/drive/folders/1hVSXVCM3ToCK6G2-mUn4iqdug9TvReK1",
      BA: "https://drive.google.com/drive/folders/11yHTTHnB25wiPP-0aZIj0hoTqjlDN062",
      CE: "https://drive.google.com/drive/folders/1vWq9U6mhdNfhObFnzV8hLl1hVeOmAzCX",
      MK: "https://drive.google.com/drive/folders/1d4cIqcv9_xbzBJPFKidgMBo3RT8d17Pe",
    },
    guides: {
      thesisGuide: "Ghid_elaborare_licenta_disertatie.pdf (în folder-ul principal)",
      thesisGuideEN: "Ghid_elaborare_licenta_disertatie en-US.pdf",
      gradingGuide: "Principii si ghid notare lucrari finale.pdf",
      gradingGuideEN: "Principii si ghid notare lucrari finale en-US.pdf",
      regulation: "Regulament de organizare si desfasurare a examenelor de finalizae a studiilor de licenta si masterat.pdf",
    },
  },
  master: {
    page: "https://www.faa.ro/index.php/studii/examen-finalizare-studii-tip-disertatie.html",
  },
};

export const STUDENT_SERVICES = {
  grades: { name: "MOPAS — Carnetul Studentului / Note", url: SITE_MAP.portals.mopas },
  courses: { name: "Moodle UB — Cursuri online", url: SITE_MAP.portals.moodle },
  email: { name: "Office 365 — Email instituțional", url: SITE_MAP.portals.office365 },
  intranet: { name: "Intranet-UB (SharePoint)", url: SITE_MAP.portals.intranet },
  scholarships: { name: "Burse", url: SITE_MAP.facilities.scholarships, mainPage: "https://www.unibuc.ro/student-ub/burse/" },
  dormitory: { name: "Cămin / Cazare", url: SITE_MAP.facilities.dormitory },
  library: { name: "Bibliotecă", url: SITE_MAP.facilities.library },
  erasmus: { name: "Mobilități Erasmus", url: SITE_MAP.facilities.erasmus },
  practice: { name: "Practică de specialitate", url: SITE_MAP.facilities.practice },
  camps: { name: "Tabere studențești", url: SITE_MAP.facilities.camps },
  civis: { name: "CIVIS FAA", url: SITE_MAP.facilities.civis },
  harassment: { name: "Sesizare Hărțuire & Discriminare", url: SITE_MAP.external.harassment },
  studentAssoc: { name: "ASAA — Asociația Studenților", url: SITE_MAP.external.studentAssoc },
};
