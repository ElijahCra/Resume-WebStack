import type { Component } from 'svelte';

// Types
export interface ContentItem {
	metadata: Record<string, string>;
	component: Component;
	filename: string;
}

export interface Personal {
	givenName: string;
	familyName: string;
	title: string;
	location: string;
	twitterUsername?: string;
	component: Component;
}

export interface Achievement {
	achievement: string;
	organization: string;
	completionYear?: string;
	component: Component;
	_id: string;
	_filename: string;
}

export interface ProfessionalExperience {
	title: string;
	organization: string;
	startDate: string;
	endDate?: string;
	component: Component;
	_id: string;
	_filename: string;
}

export interface Skill {
	title: string;
	component: Component;
	_id: string;
}

export interface AdditionalInfo {
	title: string;
	component: Component;
}

export interface PrivateField {
	label: string;
	component: Component;
}

// Helpers
function loadModules(glob: Record<string, { default: Component; metadata: Record<string, string> }>) {
	return Object.entries(glob).map(([path, mod]) => {
		const filename = path.split('/').pop()?.replace('.svx', '') ?? '';
		return {
			metadata: mod.metadata,
			component: mod.default,
			filename,
		};
	});
}

// Load content
const personalMod = import.meta.glob<{ default: Component; metadata: Record<string, string> }>(
	'./personal.svx', { eager: true }
);
const personalEntry = Object.values(personalMod)[0];
export const personal: Personal = {
	...personalEntry.metadata as unknown as Omit<Personal, 'component'>,
	component: personalEntry.default,
};

const additionalInfoMod = import.meta.glob<{ default: Component; metadata: Record<string, string> }>(
	'./additionalInfo.svx', { eager: true }
);
const additionalInfoEntry = Object.values(additionalInfoMod)[0];
export const additionalInfo: AdditionalInfo = {
	...additionalInfoEntry.metadata as unknown as Omit<AdditionalInfo, 'component'>,
	component: additionalInfoEntry.default,
};

const achievementMods = import.meta.glob<{ default: Component; metadata: Record<string, string> }>(
	'./achievements/*.svx', { eager: true }
);
export const allAchievements: Achievement[] = loadModules(achievementMods).map((item) => ({
	...item.metadata as unknown as Omit<Achievement, 'component' | '_id' | '_filename'>,
	component: item.component,
	_id: item.filename,
	_filename: item.filename,
}));

const professionalMods = import.meta.glob<{ default: Component; metadata: Record<string, string> }>(
	'./professionalExperiences/*.svx', { eager: true }
);
export const allProfessionalExperiences: ProfessionalExperience[] = loadModules(professionalMods).map((item) => ({
	...item.metadata as unknown as Omit<ProfessionalExperience, 'component' | '_id' | '_filename'>,
	component: item.component,
	_id: item.filename,
	_filename: item.filename,
}));

const skillMods = import.meta.glob<{ default: Component; metadata: Record<string, string> }>(
	'./skills/*.svx', { eager: true }
);
export const allSkills: Skill[] = loadModules(skillMods).map((item) => ({
	...item.metadata as unknown as Omit<Skill, 'component' | '_id'>,
	component: item.component,
	_id: item.filename,
}));

const privateFieldMods = import.meta.glob<{ default: Component; metadata: Record<string, string> }>(
	'./privateFields/*.svx', { eager: true }
);
export const allPrivateFields: PrivateField[] = loadModules(privateFieldMods).map((item) => ({
	...item.metadata as unknown as Omit<PrivateField, 'component'>,
	component: item.component,
}));