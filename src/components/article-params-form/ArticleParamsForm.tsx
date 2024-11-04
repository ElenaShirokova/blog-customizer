import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { FormEvent, useState, useRef } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/components/select/hooks/useOutsideClickClose';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(articleState);
	const rootRef = useRef<HTMLDivElement>(null);

	const formOpenHandler = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	const inputHandler = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState((prevState) => ({ ...prevState, [key]: value }));
	};

	const formSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		setArticleState(selectArticleState);
	};

	const formResetHandler = () => {
		setArticleState(defaultArticleState);
		setSelectArticleState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton isOpen={isOpen} onClick={formOpenHandler} />
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					<form className={styles.form} onSubmit={formSubmitHandler}>
						<Text as='h1' size={31} weight={800} uppercase dynamicLite={false}>
							Задайте параметры
						</Text>
						<Select
							selected={selectArticleState.fontFamilyOption}
							options={fontFamilyOptions}
							title={'шрифт'}
							onChange={(selectElement: OptionType) =>
								inputHandler('fontFamilyOption', selectElement)
							}
						/>
						<RadioGroup
							name={'radio'}
							options={fontSizeOptions}
							selected={selectArticleState.fontSizeOption}
							title={'размер шрифта'}
							onChange={(selectElement: OptionType) =>
								inputHandler('fontSizeOption', selectElement)
							}
						/>
						<Select
							selected={selectArticleState.fontColor}
							options={fontColors}
							title={'цвет шрифта'}
							onChange={(selectElement: OptionType) =>
								inputHandler('fontColor', selectElement)
							}
						/>
						<Separator />
						<Select
							selected={selectArticleState.backgroundColor}
							options={backgroundColors}
							title={'цвет фона'}
							onChange={(selectElement: OptionType) =>
								inputHandler('backgroundColor', selectElement)
							}
						/>
						<Select
							selected={selectArticleState.contentWidth}
							options={contentWidthArr}
							title={'ширина контента'}
							onChange={(selectElement: OptionType) =>
								inputHandler('contentWidth', selectElement)
							}
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={formResetHandler}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
