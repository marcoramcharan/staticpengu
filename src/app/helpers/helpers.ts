import { useNavigate } from "react-router-dom"

export const hello : string = `marco`

export const hello2 : string = `marco2`

export function go(path:string){
    const navigate = useNavigate()
    navigate(path)
} 

export interface link{
  label: string; value: string; type: string;
}

export interface portfolio {
    template?: string;
    name?: string;
    surname?: string;
    about?: string;
    skills?: string[];
    hobbies?: string[];
    softSkills?: string[];
    workExperience?: { company: string; position: string; from_date: string, to_date: string }[];
    education?: { company: string; position: string; from_date: string, to_date: string }[];
    email?: string;
    occupation?: string;
    links?: link[];
    footer?: string;
    navbar?: string;
    scroll?: boolean;
    font?: string;
    cell?: string;
    photo?: string;
    views?: number;
    photo2?: any;
    photoChange?: any;
  }

  export const defaultPortfolio: portfolio = {
    template: '',
    name: '',
    surname: '',
    about: '',
    skills: [],
    hobbies: [],
    softSkills: [],
    workExperience: [],
    education: [],
    email: '',
    occupation: '',
    links: [],
    footer: '',
    navbar: '',
    scroll: false,
    font: '',
    cell: '',
    photo: '',
    views:0
  };

  
export interface EmployeePortfolio {
  name?: string;
  surname?: string;
  age?: string;
  skills?: string[];
  occupation?: string;
  about?: string;
  website?: string;
  contact_no?: string;
  email?: string;
  active:boolean;
}

export const defaultEmployeePortfolio: EmployeePortfolio = {
  name: '',
  surname: '',
  about: '',
  age:'',
  skills: [],
  website:'', 
  contact_no:'',
  email: '',
  occupation: '',
  active:false
};

export interface EmployerPortfolio {
  _id?:string;
  name?: string;
  surname?: string;
  age?: string;
  skills?: string[];
  occupation?: string;
  about?: string;
  website?: string;
  contact_no?:string[];
  email?: string;
  photo?:string;
  location?:string[];
  locationHierarchy?: any[];
  work_force?:string;
  hr_emails?:string[];
  active?:boolean;
  photo2?: any;
  photoChange?: any;
}

export const defaultEmployerPortfolio: EmployerPortfolio = {
  name: '',
  surname: '',
  about: '',
  age:'',
  skills: [],
  website:'', 
  contact_no:[],
  email: '',
  occupation: '',
  photo:'',
  location:[],
  locationHierarchy:[],
  work_force:'',
  hr_emails:[],
  active:false
};


/* postjob */
export interface Job {
  _id?:string;
  reciever_email?: string;
  company_id?: string;
  company_name?: string;
  title?: string;
  description?: string;
  salary?: string;
  work_type?: string;
  employment_type?: string;
  location?: string[];
  locationHierarchy?: any[];
  requirements?: string[];
  responsibilities?: string[];
  active:boolean;
  categories?:string[];
  createdAt?:string;
  hr_emails?:string[];
}

export const defaultJob: Job = {
  reciever_email: '',
  company_id: '',
  company_name: '',
  title: '',
  description: '',
  salary: '10 000',
  location: [],
  locationHierarchy: [],
  work_type: '',
  requirements: [],
  responsibilities: [],
  active:false,
  categories:[],
  createdAt: "",
  employment_type:"",
  hr_emails:[]
};



export interface Preferences {

  saved?: any[];  // Replace `any` with the specific type if known
  hidden?: any[]; // Replace `any` with the specific type if known
  }

// Default variable for prefSchema
export const defaultPreferences: Preferences = {
  saved: [],
  hidden: [],
};