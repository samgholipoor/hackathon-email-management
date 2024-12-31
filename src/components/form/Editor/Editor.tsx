import { useEffect, useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { FormError } from '@khesht/react';
import SuspenseFallback from '@/components/SuspenseFallback';
import { mergeClassNames } from '@/utils/classname';
import { Label, useFormField } from '../Form';
import SourceEditor from './SourceEditor';

interface EditorProps {
	label?: string;
	className?: string;
	name: string;
	validator?: ((e: any) => string | boolean)[];
	formatter?: (e: any) => any;
	options?: any;
	loading?: boolean;
	loadingMessage?: string;
}

function Editor({
	label = '',
	className,
	formatter,
	options,
	loading = false,
	loadingMessage = 'درحال راه‌اندازی...',
	...fieldProps
}: EditorProps) {
	const { id, value, onChange, error, disabled, ...props } = useFormField(
		{ formatter, ...fieldProps } as any,
		'',
	);

	const handleEditorChange = (_, editor) => {
		onChange(editor.getData());
	};

	const [editorKey, setEditorKey] = useState(1);
	const isComponentMount = useRef(false);

	useEffect(() => {
		if (!isComponentMount.current) return;
		setEditorKey((p) => p + 1);
	}, [options]);

	useEffect(() => {
		if (!isComponentMount.current) {
			isComponentMount.current = true;
			return;
		}
	}, []);

	return (
		<div className={mergeClassNames('flex flex-col relative', className)} {...props}>
			{label ? <Label className="mb-2" label={label} /> : null}
			<CKEditor
				key={editorKey}
				data={value}
				editor={SourceEditor}
				onReady={(editor) => {
					if (!editor?.editing?.view?.document) return;
					const documentView = editor.editing.view.document;
					documentView.on('clipboardInput', (evt: any, data: any) => {
						try {
							const rtf = data.dataTransfer.getData('text/html');
							if (rtf) {
								evt.stop();
								const content = rtf
									.replace(/(background-color)(.*?);/g, '')
									.replace(/(caret-color)(.*?);/g, '')
									.replace(/(font-family)(.*?);/g, '')
									.replace(/(color)(.*?);/g, '');

								const viewFragment = editor.data.processor.toView(content);
								const modelFragment = editor.data.toModel(viewFragment);
								editor.model.insertContent(
									modelFragment,
									editor.model.document.selection,
								);
							}
						} catch (e) {
							// console.error(e);
						}
					});
				}}
				onChange={handleEditorChange}
				disabled={disabled}
				config={options}
			/>

			{loading ? (
				<SuspenseFallback
					message={loadingMessage}
					className="absolute top-0 left-0 w-full h-full bg-opacity-80 rounded-none"
				/>
			) : null}
			{error ? <FormError>{error}</FormError> : null}
		</div>
	);
}

export default Editor;
