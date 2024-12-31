const goftino = {
	getGofino() {
		return window.Goftino || {};
	},
	open() {
		this.getGofino().open();
	},
	close() {
		this.getGofino().close();
	},
	toggle() {
		this.getGofino().toggle();
	},
	handleGoftinoOpenWidgetEvent(fn: (e: any) => void) {
		window.addEventListener('goftino_openWidget', fn);
	},
	removeGoftinoOpenWidgetEvent(fn: (e: any) => void) {
		window.removeEventListener('goftino_openWidget', fn);
	},
	handleGoftinoCloseWidgetEvent(fn: (e: any) => void) {
		window.addEventListener('goftino_closeWidget', fn);
	},
	removeGoftinoCloseWidgetEvent(fn: (e: any) => void) {
		window.removeEventListener('goftino_closeWidget', fn);
	},
	handleGoftinoReadyEvent(fn: (e: any) => void) {
		window.addEventListener('goftino_ready', fn);
	},
	removeGoftinoReadyEvent(fn: (e: any) => void) {
		window.removeEventListener('goftino_ready', fn);
	},
	getUserId() {
		return this.getGofino()?.getUserId?.();
	},
	setUserId(userId: string) {
		return new Promise((resolve, reject) => {
			this.getGofino()?.setUserId?.(
				userId,
				({ status }: { status: 'success' | 'error' }) => {
					if (status === 'success') {
						resolve('resolve');
					}
					reject('reject');
				},
			);
		});
	},
	unSetUserId() {
		this.getGofino()?.unsetUserId?.();
	},
	setUser({
		name,
		email,
		tags,
	}: {
		name: string;
		email: string;
		tags: string;
		phone?: string;
	}) {
		this.getGofino()?.setUser?.({
			name,
			email,
			tags,
			forceUpdate: true,
		});
	},
};

export { goftino };
