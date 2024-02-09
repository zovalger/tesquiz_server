import { Roles, TypeText } from "./enums";

export interface userAttributes {
	_id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	role: Roles;
}

export interface loginData extends Pick<userAttributes,"email"|"password">{}

export interface StudentUserAttributes extends userAttributes {}

export interface AdminUserAttributes extends userAttributes {
	permissions: String[];
}

export interface AdminUserAttributes_create extends AdminUserAttributes {
	repeatPassword: string;
}
export interface RegisterStudentData {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	repeatPassword: string;
}

export interface SectionAttributes {
	_id: string;
	title: string;
	order: number;
}

export interface SectionAttributes_create
	extends Omit<SectionAttributes, "_id" | "order"> {}

export interface TextBox {
	type: TypeText;
	text: string;
}
export interface ClassAttributes {
	_id: string;
	title: string;
	order: number;
	content: TextBox[];
	section_id: string;
}

export interface ClassAttributes_create extends Omit<ClassAttributes, "_id"> {}

export interface QuizAttributes {
	_id: string;
	question: string;
	correct: string[];
	incorrect: string[];
	timer: number;
	class_id: string;
}

export interface QuizAttributes_create extends Omit<QuizAttributes, "_id"> {}
