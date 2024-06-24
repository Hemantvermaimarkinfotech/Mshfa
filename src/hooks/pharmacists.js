import { useQuery, useMutation } from "@apollo/client";
import { PharmacistAPI, PharmacyAPI } from "api";
import { PHARMACIST_FIELDS } from "api/pharmacist.api";

export const usePharmacist = (id) => {

    const { data, loading, error } = useQuery(PharmacistAPI.getPharmacistById(), { variables: { id }, errorPolicy: 'all' });
    console.log('dataaaaaaaaaaaaaaaaaaaa', data);
    console.log('erorrrrrrrr', error);

    let pharmacistStaff;

    if (data?.pharmacyStaffDetails) {
        pharmacistStaff = data.pharmacyStaffDetails;
    }

    return { pharmacistStaff, pharmacistStaffLoading: loading, pharmacistStaffError: error };
}

export const usePharmacistAPI = () => {

    const [create] = useMutation(PharmacistAPI.createPharmacist());
    const [update] = useMutation(PharmacistAPI.updatePharmacist());
    const [pharmacistDelete] = useMutation(PharmacistAPI.deletePharmacist());

    const createPharmacist = (data, pharmacyID) => {
        return create({ variables: { input: data },
            update(cache, { data : { pharmacistCreate: { pharmacist, success } } }) {
                if (success ) {
                    cache.modify({
                        id: cache.identify({ __typename: PharmacyAPI.typename, id: pharmacyID }),
                        fields: {
                            pharmacists(existingPharmacistsRefs = []) {
                                const newPharmacistRef = cache.writeFragment({
                                    data: pharmacist,
                                    fragment: PHARMACIST_FIELDS
                                });
                                return [...existingPharmacistsRefs, newPharmacistRef];
                            }
                        },
                    })
                }
            }
        })
        .then((response) => response.data?.pharmacistCreate)
    }

    const updatePharmacist = (data) => {
        return update({ variables: { input: data } })
            .then((response) => response.data?.pharmacistUpdate)
    }

    const deletePharmacist = (data, pharmacyID) => {
        return pharmacistDelete({ variables: { input: data },
            update(cache, { data : { pharmacistDelete: { success } } }) {
                if (success ) {
                    cache.modify({
                        id: cache.identify({ __typename: PharmacyAPI.typename, id: pharmacyID }),
                        fields: {
                            pharmacists(existingPharmacistsRefs, { readField }) {
                                return existingPharmacistsRefs.filter(
                                    pharmacistRef => data.id !== readField('id', pharmacistRef)
                                );
                            },
                        },
                    })
                }
            }
        })
        .then((response) => response.data?.pharmacistDelete)
    }

    return { createPharmacist, updatePharmacist, deletePharmacist };

}