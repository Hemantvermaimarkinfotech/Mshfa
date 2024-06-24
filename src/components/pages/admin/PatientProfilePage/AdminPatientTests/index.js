import './index.scss';

import React, { useRef } from "react";
import { useSnackbar } from 'notistack';
import {useIntl} from "react-intl";

import { useTable } from "hooks/table";
import { useUploadsAPI } from "hooks/uploads";
import tableConfig from "config/table.config";
import { uploadType } from "config/upload";
import { BoxLoader, GlobalMessage } from "components/layout";
import { Attachment, UploadTestBtn } from "components/common";


const AdminPatientTests = ({ patientId }) => {

  const intl = useIntl();

  const { enqueueSnackbar } = useSnackbar();

  const { uploadPatientTest } = useUploadsAPI()

  const {
    rows,
    dataIsLoading,
    dataError
  } = useTable(tableConfig.patientTests, { patient: patientId, category: uploadType.TEST });

  const handleUploadFile = (file, error) => {
    if (file) {
      uploadPatientTest(patientId, file)
          .then(response => {
            if (response.success) enqueueSnackbar(intl.formatMessage({id: 'words.common.uploaded'}))
            else enqueueSnackbar(intl.formatMessage({id: 'words.common.upload-error'}), { variant: 'error' });
          })
    } else if ( error ) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  if (dataIsLoading) {
    return <div className={'tests'}>
      <BoxLoader />
    </div>
  }

  if (dataError && !rows) {
    return <div className={'tests'}>
      <GlobalMessage message={`Sorry, Tests not found`} />
    </div>
  }

  return <div className={'tests'}>
    <div className={'tests__header'}>
      <UploadTestBtn onChange={handleUploadFile}/>
    </div>
    <div className="tests__content">
      {rows && rows.length ?
        rows.map((test, key) =>
          <Attachment key={ test.id }
                      showUploadTime={true}
                      data={test}
                      readonly
          />)
      :
        <GlobalMessage message={'Patient have no tests'}/>}
    </div>
  </div>
}

export default AdminPatientTests;
