import "./index.scss";

import React, { useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useReactiveVar } from "@apollo/client";
import state from "apollo/state";

import {
  Paper,
  PageHeader,
  PageTitle,
  PageMetadata,
  Breadcrumbs,
  GlobalLoader,
  GlobalError,
} from "components/layout";
import { CreateDoctorForm } from "components/forms";
import { useDoctor, useDoctorAPI } from "hooks/doctors";

import { GlobalAppRouter } from "routes";
import { daysArrayToRanges } from "utils/date";

const EditDoctorPage = ({ route }) => {
  const title = route.meta?.title;
  const redirect = useReactiveVar(state.doctorProfileRedirect);
  const history = useHistory();
  const { id } = useParams();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { doctor, doctorLoading, doctorError } = useDoctor(id);
  const { updateDoctor } = useDoctorAPI();
  const workModel = doctor?.workModel?.key
    ? parseInt(doctor.workModel.key)
    : undefined;
  const preparedValues = useMemo(() => {
    if (!doctor) return null;
    const {
      __typename,
      id,
      avatar,
      workModel,
      doctorId,
      isBlocked,
      specializations,
      educations,
      diplomas,
      languages,
      appointmentTimeBox,
      appointmentTimeBoxFollowup,
      schedules,
      daysOff,
      gender,
      clinic,
      bookBeforeType,
      cancelBeforeType,
      bookBefore,
      cancelBefore,
      category,
      ...rest
    } = doctor;

    const preparedSchedules = {};
    Object.keys(schedules).forEach((day) => {
      if (day === "__typename") return;
      preparedSchedules[day] = schedules[day].map((workingDay) => {
        const { __typename, ...rest } = workingDay;
        delete rest["delete"];
        return { ...rest };
      });
    });

    return {
      clinicId: clinic?.id,
      category: category?.id || null,
      doctorId: id,
      languages: languages
        ? languages.map((language) => {
            const { __typename, ...rest } = language;
            return rest.key;
          })
        : [],
      specializations: specializations.map((specialization) => {
        const { __typename, specialistType, speciality, ...rest } =
          specialization;
        return {
          specialistType: specialistType?.key || "",
          speciality: speciality?.key || "",
          ...rest,
        };
      }),
      educations: educations.map((education) => {
        const { __typename, ...rest } = education;
        return { ...rest };
      }),
      diplomas: diplomas.map((diploma) => {
        const { __typename, ...rest } = diploma;
        return { ...rest };
      }),
      appointmentTimeBox: appointmentTimeBox.key,
      appointmentTimeBoxFollowup: appointmentTimeBoxFollowup.key,
      bookBeforeType: bookBeforeType?.key || 0,
      cancelBeforeType: cancelBeforeType?.key || 0,
      bookBefore: bookBefore || 0,
      cancelBefore: cancelBefore || 0,
      gender: gender?.key || "",
      profileImage: avatar,
      schedules: preparedSchedules,
      daysOff: daysArrayToRanges(daysOff),
      ...rest,
    };
  }, [doctor]);

  if (doctorLoading) {
    return <GlobalLoader />;
  }
  if (doctorError) {
    return <GlobalError />;
  }

  const handleSubmit = (data) => {
    const { isBlocked, id, profileImage, email, ...rest } = data;
    return updateDoctor(rest)
      .then((response) => {
        if (response) {
          if (response.success) {
            let key = enqueueSnackbar("Doctor saved", {
              onClick: () => {
                closeSnackbar(key);
              },
            });
            if (redirect) history.push(redirect);
            else history.push(GlobalAppRouter.paths.doctors);
          } else {
            enqueueSnackbar("Error while updating doctor", {
              variant: "error",
            });
            return response;
          }
        }
      })
      .catch((e) =>
        enqueueSnackbar("Error while updating doctor", { variant: "error" })
      );
  };

  return (
    <div className={"page page--thin page--blue page--scroll edit-doctor-page"}>
      <PageHeader>
        <PageMetadata>
          <Breadcrumbs route={route} params={{ id }} />
          <PageTitle title={title} />
        </PageMetadata>
      </PageHeader>
      <Paper>
        <CreateDoctorForm
          isEditing={true}
          onSubmit={handleSubmit}
          initialValues={preparedValues}
          workModel={workModel}
        />
      </Paper>
    </div>
  );
};

export default EditDoctorPage;
