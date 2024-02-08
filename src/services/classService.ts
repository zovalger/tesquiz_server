import { ObjectId } from "mongoose";
import { ClassAttributes, ClassAttributes_create } from "../../types";
import ClassModel from "../models/class.model";
import { deleteQuizzes_By_ClassId_service } from "./quizService";

export const getNextNumberOfClass_service = async (
	section_id: string | ObjectId
): Promise<number> => {
	try {
		const allClass = await ClassModel.find({ section_id })
			.sort({ order: -1 })
			.limit(1);

		const order = allClass.length > 0 ? allClass[0].order + 1 : 1;

		return order;
	} catch (error) {
		console.log(error);
		return 0;
	}
};

export const createClass_service = async (
	section_id: string,
	data: ClassAttributes_create
) => {
	try {
		const order = await getNextNumberOfClass_service(section_id);

		const newClass = new ClassModel({
			...data,
			order,
			section_id,
		});

		await newClass.save();

		return newClass;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const getClasses_service = async () => {
	try {
		const classes = await ClassModel.find().sort({ order: 1 });

		return classes;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const getClass_By_Id_service = async (_id: string) => {
	try {
		const classItem = await ClassModel.findById(_id);

		return classItem;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const getClasses_By_SectionId_service = async (section_id: string) => {
	try {
		const classes = await ClassModel.find({ section_id }).sort({ order: 1 });

		return classes;
	} catch (error) {
		console.log(error);
		return;
	}
};


export const getClasses_By_SectionId_with_complete_service = async (section_id: string) => {
	try {
		const classes = await ClassModel.find({ section_id }).sort({ order: 1 });

		return classes;
	} catch (error) {
		console.log(error);
		return;
	}
};


export const updateClass_service = async (
	_id: string,
	data: ClassAttributes
) => {
	try {
		const { content, title } = data;

		const classItem = await ClassModel.findById(_id);

		if (!classItem) return;

		classItem.title = title;
		classItem.content = content;

		await classItem.save();

		return classItem;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const updateClassToUp_service = async (_id: string) => {
	try {
		const classItem = await ClassModel.findById(_id);

		if (!classItem) return;

		const { order, section_id } = classItem;

		const toOrder = order - 1;

		if (toOrder < 0) return;

		const classItemTop = await ClassModel.findOne({
			order: toOrder,
			section_id,
		});

		if (classItemTop) {
			classItemTop.order = order;

			await classItemTop.save();
		}

		classItem.order = toOrder;

		await classItem.save();

		return classItem;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const updateClassToDown_service = async (_id: string) => {
	try {
		const classItem = await ClassModel.findById(_id);

		if (!classItem) return;

		const { order, section_id } = classItem;

		const maxNumber = await getNextNumberOfClass_service(section_id);

		const toOrder = order + 1;

		if (toOrder >= maxNumber) return;

		const classItemBottom = await ClassModel.findOne({
			order: toOrder,
			section_id,
		});

		if (classItemBottom) {
			classItemBottom.order = order;

			await classItemBottom.save();
		}

		classItem.order = toOrder;

		await classItem.save();

		return classItem;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const deleteClass_service = async (_id: string) => {
	try {
		const classItem = await ClassModel.findById(_id);

		if (!classItem) return;

		const { order, section_id } = classItem;

		const deletedOrder = order;
		// todo: eliminar quizes

		await deleteQuizzes_By_ClassId_service(_id);

		await ClassModel.updateMany(
			{ order: { $gt: deletedOrder }, section_id },
			{ $inc: { order: -1 } }
		);

		await ClassModel.deleteOne({ _id });

		return;
	} catch (error) {
		console.log(error);
		return;
	}
};
