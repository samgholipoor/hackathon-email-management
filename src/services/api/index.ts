export * from './resources/assembly';
export * from './resources/async-tasks';
export * from './resources/company';
export * from './resources/config';
export * from './resources/credits';
export * from './resources/documented-contract';
export * from './resources/events';
export * from './resources/inbox-message';
export * from './resources/otp';
export * from './resources/promise';
export * from './resources/report';
export * from './resources/stocks';
export * from './resources/token';
export * from './resources/upload';
export * from './resources/users';

import assemblyApis from './resources/assembly';
import asyncTasksApis from './resources/async-tasks';
import companyApis from './resources/company';
import configApis from './resources/config';
import creditApis from './resources/credits';
import documentedContractApis from './resources/documented-contract';
import eventsApis from './resources/events';
import inboxMessageApis from './resources/inbox-message';
import otpApis from './resources/otp';
import promiseApis from './resources/promise';
import reportApis from './resources/report';
import stocksApis from './resources/stocks';
import tokenApis from './resources/token';
import uploadApis from './resources/upload';
import usersApis from './resources/users';

export default {
	...assemblyApis,
	...asyncTasksApis,
	...companyApis,
	...configApis,
	...creditApis,
	...documentedContractApis,
	...eventsApis,
	...inboxMessageApis,
	...otpApis,
	...promiseApis,
	...reportApis,
	...stocksApis,
	...tokenApis,
	...uploadApis,
	...usersApis,
};
