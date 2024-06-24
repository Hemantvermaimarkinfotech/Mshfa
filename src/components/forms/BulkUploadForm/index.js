import './index.scss';

import React, { useState } from 'react';
import {useIntl} from "react-intl";

import { TitledBlock } from 'components/layout';
import { FileUpload } from 'components/common';
import { PrimaryButton, TextButton } from "components/layout/buttons";
import {medicineArchiveUploadAcceptTypes, medicineUploadAcceptTypes} from "config/upload";
import {useUser} from "hooks/user";


const BulkUploadForm = ({ onCancel, onSubmit }) => {

    const { user } = useUser();
    const intl = useIntl()
    const [zip, setZip] = useState(null);
    const [csv, setCsv] = useState(null);

    const handleSubmit = () => {
        onSubmit({ zip, csv });
    }

    const getExampleLink = () => `${process.env.REACT_APP_BACKEND_ROOT}example/medicine/bulk/`;
    const getArchiveLink = () => `${process.env.REACT_APP_BACKEND_ROOT}example/medicine/archive/`;

    return (
        <div className={'bulk-upload-form'}>
            <TitledBlock title={'To upload medicine'}>
                <ul className={'bulk-upload-form__list'}>
                    <li className={'bulk-upload-form__item'}>
                        <span className={'bulk-upload-form__text'}>1. Download a <a className={'bulk-upload-form__link'} target="_blank" href={getExampleLink()}>Template</a></span>
                    </li>
                    <li className={'bulk-upload-form__item'}>
                        <span className={'bulk-upload-form__text'}>2. Add your data to the template file <span className={'bulk-upload-form__text bulk-upload-form__text--caption'}>(make sure to export or save as *.csv)</span></span>
                    </li>
                    <li className={'bulk-upload-form__item'}>
                        <span className={'bulk-upload-form__text'}>3. Upload it below for processing</span>
                    </li>
                </ul>
            </TitledBlock>
            {['pharmacist'].indexOf(user.role) !== -1 && <>
                <p className={'separator'}>OR</p>
                <TitledBlock title={'To upload medicine images'}>
                    <ul className={'bulk-upload-form__list'}>
                        <li className={'bulk-upload-form__item'}>
                            <span className={'bulk-upload-form__text'}>1. Place all images in one folder</span>
                        </li>
                        <li className={'bulk-upload-form__item'}>
                            <span className={'bulk-upload-form__text'}>2. Make sure the image name is the same as correspondent medicine name</span>
                        </li>
                        <li className={'bulk-upload-form__item'}>
                            <span className={'bulk-upload-form__text'}>3. Archive the folder</span>
                        </li>
                        <li className={'bulk-upload-form__item'}>
                            <span className={'bulk-upload-form__text'}>4. Upload the <a className={'bulk-upload-form__link'} target="_blank" href={getArchiveLink()}>archive</a></span>
                        </li>
                    </ul>
                </TitledBlock>
            </>
            }

            <p className={'bulk-upload-form__caption'}>Help is needed? Call our operations team at <span className={'bulk-upload-form__phone'}>+965 955 576 19</span>.</p>
            <div className="bulk-upload-form__attachments">
                <FileUpload placeholder={'Choose *.csv file'} onUpload={setCsv} acceptType={medicineUploadAcceptTypes}/>
                {['pharmacist'].indexOf(user.role) !== -1 &&
                    <FileUpload placeholder={'Choose archive images file'} acceptType={medicineArchiveUploadAcceptTypes}
                                onUpload={setZip}/>
                }
            </div>
            <div className="bulk-upload-form__buttons">
                <TextButton text={intl.formatMessage({id: 'words.common.cancel'})} onClick={onCancel} />
                <PrimaryButton text={intl.formatMessage({id: 'words.common.done'})} onClick={handleSubmit} />
            </div>
        </div>
    )
};

export default BulkUploadForm;
