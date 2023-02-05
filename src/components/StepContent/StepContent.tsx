import { PropsWithChildren, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  StepperContext,
  StepperContextType,
  Button,
  ButtonVariant,
} from 'components';

import styles from './StepContent.module.scss';

interface StepContentProps {
  step: number;
  currentStep: number;
  isLast: boolean;
  isFirst: boolean;
}

export const StepContent = ({
  isFirst,
  isLast,
  step,
  children,
}: PropsWithChildren<StepContentProps>) => {
  const {
    stepsDescriptor,
    finishButtonContent,
    handleFinish,
    handleNextStep,
    handlePreviousStep,
  } = useContext(StepperContext) as StepperContextType;

  const navigate = useNavigate();

  return (
    <div className={styles.step}>
      <div className={styles.stepBody}>{children}</div>
      <div className={styles.stepActions}>
        <Button
          disabled={isFirst}
          onClick={handlePreviousStep}
          variant={ButtonVariant.Default}
        >
          <FormattedMessage id="buttons.back" defaultMessage="Назад" />
        </Button>

        {isLast ? (
          <Button
            onClick={() => {
              handleFinish();
              navigate('/meetups/moderation');
            }}
            variant={ButtonVariant.Primary}
            disabled={!stepsDescriptor[step].confirmed}
          >
            {finishButtonContent}
          </Button>
        ) : (
          <Button
            onClick={handleNextStep}
            variant={ButtonVariant.Primary}
            disabled={!stepsDescriptor[step].confirmed}
          >
            <FormattedMessage id="buttons.next" defaultMessage="Далее" />
          </Button>
        )}
      </div>
    </div>
  );
};
