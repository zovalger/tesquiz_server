import { SectionAttributes, SectionAttributes_create } from "../../types";
import SectionModel from "../models/section.model";
import { getClasses_By_SectionId_service } from "./classService";

export const getNextNumberOfSection_service = async (): Promise<number> => {
	try {
		const allSection = await SectionModel.find().sort({ order: -1 }).limit(1);

		const order = allSection.length > 0 ? allSection[0].order + 1 : 1;

		return order;
	} catch (error) {
		console.log(error);
		return 0;
	}
};

export const createSection_service = async (data: SectionAttributes_create) => {
	try {
		const order = await getNextNumberOfSection_service();

		const newSection = new SectionModel({
			...data,
			order,
		});

		await newSection.save();

		return newSection;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const getSections_service = async () => {
	try {
		const sections = await SectionModel.find().sort({ order: 1 });

		return sections;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const getSection_service = async (_id: string) => {
	try {
		const section = await SectionModel.findById(_id);

		return section;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const updateSection_service = async (
	_id: string,
	data: SectionAttributes
) => {
	try {
		const section = await SectionModel.findById(_id);

		if (!section) return;

		section.title = data.title;

		await section.save();

		return section;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const updateSectionToUp_service = async (_id: string) => {
	try {
		const section = await SectionModel.findById(_id);

		if (!section) return;

		const { order } = section;

		const toOrder = order - 1;

		if (toOrder < 0) return;

		const sectionTop = await SectionModel.findOne({ order: toOrder });

		if (sectionTop) {
			sectionTop.order = order;

			await sectionTop.save();
		}

		section.order = toOrder;

		await section.save();

		return section;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const updateSectionToDown_service = async (_id: string) => {
	try {
		const section = await SectionModel.findById(_id);

		if (!section) return;

		const { order } = section;

		const maxNumber = await getNextNumberOfSection_service();

		const toOrder = order + 1;

		if (toOrder >= maxNumber) return;

		const sectionBottom = await SectionModel.findOne({ order: toOrder });

		if (sectionBottom) {
			sectionBottom.order = order;

			await sectionBottom.save();
		}

		section.order = toOrder;

		await section.save();

		return section;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const deleteSection_service = async (_id: string) => {
	try {
		const section = await SectionModel.findById(_id);

		if (!section) return;

		const classes = await getClasses_By_SectionId_service(section.id);

		if (classes && classes.length) return;

		const deletedOrder = section.order;

		await SectionModel.updateMany(
			{ order: { $gt: deletedOrder } },
			{ $inc: { order: -1 } }
		);

		await SectionModel.deleteOne({ _id });

		return;
	} catch (error) {
		console.log(error);
		return;
	}
};
