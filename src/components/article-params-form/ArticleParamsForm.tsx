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
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(articleState);
	const rootRef = useRef<HTMLDivElement>(null);

	const openFormHandler = () => {
		setIsMenuOpen((isMenuOpen) => !isMenuOpen);
	};

	const handleInput = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState((prevState) => ({ ...prevState, [key]: value }));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setArticleState(selectArticleState);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		setSelectArticleState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton isOpen={isMenuOpen} onClick={openFormHandler} />
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isMenuOpen,
					})}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<Text as='h1' size={31} weight={800} uppercase dynamicLite={false}>
							Задайте параметры
						</Text>
						<Select
							selected={selectArticleState.fontFamilyOption}
							options={fontFamilyOptions}
							title={'шрифт'}
							onChange={(selectElement: OptionType) =>
								handleInput('fontFamilyOption', selectElement)
							}
						/>
						<RadioGroup
							name={'radio'}
							options={fontSizeOptions}
							selected={selectArticleState.fontSizeOption}
							title={'размер шрифта'}
							onChange={(selectElement: OptionType) =>
								handleInput('fontSizeOption', selectElement)
							}
						/>
						<Select
							selected={selectArticleState.fontColor}
							options={fontColors}
							title={'цвет шрифта'}
							onChange={(selectElement: OptionType) =>
								handleInput('fontColor', selectElement)
							}
						/>
						<Separator />
						<Select
							selected={selectArticleState.backgroundColor}
							options={backgroundColors}
							title={'цвет фона'}
							onChange={(selectElement: OptionType) =>
								handleInput('backgroundColor', selectElement)
							}
						/>
						<Select
							selected={selectArticleState.contentWidth}
							options={contentWidthArr}
							title={'ширина контента'}
							onChange={(selectElement: OptionType) =>
								handleInput('contentWidth', selectElement)
							}
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={handleReset}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
