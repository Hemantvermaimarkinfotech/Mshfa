import { useMutation } from '@apollo/client';
// import { PharmacistStaffAPI, PHARMACISTSTAFF_FIELDS } from './api/pharmacystaff.api';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client'; 
import { PHARMACISTSTAFF_FIELDS } from 'api/pharmacystaff.api';
import { PharmacistStaffAPI } from 'api';
export const usePharmacistStaffAPI = () => {
  const [create] = useMutation(PharmacistStaffAPI.createPharmacistStaff());
  const [pharmacyStaffDelete] = useMutation(PharmacistStaffAPI.deletePharmacyStaff());
  const [update] = useMutation(PharmacistStaffAPI.updatePharmacistStaff());

  const createPharmacistStaff = (data, pharmacyID) => {
    return create({
      variables: { input: data },
      update(cache, { data: { PharmacistStaffCreate: { PharmacistStaff, success } } }) {
        if (success) {
          cache.modify({
            id: cache.identify({ __typename: 'PharmacyStaffType', id: pharmacyID }),
            fields: {
              pharmacists(existingPharmacistsRefs = []) {
                const newPharmacistRef = cache.writeFragment({
                  data: PharmacistStaff,
                  fragment: PHARMACISTSTAFF_FIELDS,
                });
                return [...existingPharmacistsRefs, newPharmacistRef];
              },
            },
          });
        }
      },
    }).then((response) => response.data?.PharmacistStaffCreate);
  };

  const updatePharmacistStaff = (data) => {
    console.log('dataa',data)
    return update({
      variables: {
        input:data }
    }).then((response) => response.data?.PharmacistStaffUpdate);
  };
  
  

  const deletePharmacyStaff = (data) => {
    return pharmacyStaffDelete({ variables: { input: data } }).then((response) => response.data?.pharmacistStaffDelete);
  };

  return { createPharmacistStaff, deletePharmacyStaff,updatePharmacistStaff };
};
// const GET_PHARMACIST_STAFF_BY_ID = gql`
//   query pharmacyStaffDetails($id: ID!) {
//     pharmacyStaffDetails(id: $id) {
//       ...PharmacistStaffFields
//     }
//   }
//   ${PHARMACISTSTAFF_FIELDS}
// `;

export const usePharmacistStaff = (id) => {
    const { data, loading, error } = useQuery(
        PharmacistStaffAPI.getPharmacyStaffById(),
    
        {
            variables: { id },
            errorPolicy: 'all',
        }
    );
    console.log('apiiiiiiiiiiii ddddddddaaaaaaaaaaaaaattttttttaaaaaa',data)
    const pharmacistStaff = data?.pharmacyStaffDetails || null;
    return { pharmacistStaff, pharmacistStaffLoading: loading, pharmacistStaffError: error };
};