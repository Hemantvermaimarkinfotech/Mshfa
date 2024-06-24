import './index.scss';

import React from "react";

import { TextFormatter } from "services";
import { minutesToHumanReadable } from "utils/date";
import { formatCurrency } from "utils/common";

import { TitledText } from "components/layout";
import ProfileWorkingHours from "components/common/ProfileWorkingHours";
import { FormattedMessage } from "react-intl";

const PharmacyInfo = ({ pharmacy }, isModal) => {

  const formatPhoneNumbers = (numbers) => {
    if (!numbers || (Array.isArray(numbers) && numbers.length === 0)) return "N/A";
    return numbers.map((number, key) => <div key={key} className="phone-number">
      {(typeof number === "string") ? number : number.phone}
      {key === 0 && <span className="phone-number-primary">(<FormattedMessage id="fields.suffixes.primary"/>)</span>}
    </div>)
  }

  return (
    <div className={'profile-card'}>
      <span className="profile-card__name">{pharmacy.title}</span>
      <div className="profile-card__body">
        <TitledText  title={'Address'}>{TextFormatter.formatAddress(pharmacy, 'N/A')}</TitledText>
        <TitledText title={'Phone Number(s)'}>{formatPhoneNumbers(pharmacy.phones, 'N/A')}</TitledText>
        <TitledText localeId={'words.common.email'}>{pharmacy.email || 'N/A'}</TitledText>
        <TitledText title={'Approximate Delivery Time'}>{minutesToHumanReadable(pharmacy.deliveryTime) || 'N/A'}</TitledText>
        <TitledText title={'Delivery Fee'}>{formatCurrency(pharmacy.deliveryFee)}</TitledText>
        <TitledText title={'Minimum Order Price'}>{formatCurrency(pharmacy.minimumOrderPrice)}</TitledText>
        <ProfileWorkingHours workingHours={pharmacy.workingHours} isModal={isModal} />
      </div>
    </div>
  )
};

export default PharmacyInfo;
