import { gql } from "@apollo/client";

export const ORDER_FIELDS = gql`
    fragment OrderFields on OrderType {
        id
        orderNum
        deliveryAddress
        beforeDiscount
        homeServicePrice
        items {
          stock
            hasPrescription
        }
        patient {
            id
            firstName
            lastName
            avatar
            uhi
            phone
        }
        pharmacy {
            id
            title
            area
            phones
        }
        doctor {
            lastName
            firstName
            avatar
            id
            workModel {
               key
            }
        }
        status {
            key
            val
        }
        total,
        reason,
        createdAt,
        updatedAt
    }
`;

export const ORDER_DETAILS_FIELDS = gql`
    fragment OrderDetailsFields on OrderType {
        id
        patientId
        orderNum
        beforeDiscount
        homeServicePrice
        patient {
            id
            firstName
            lastName
            avatar
            uhi
            contract
            insurance {
                number
                frontside
                backside
            }
        }
        deliveryAddress
        deliveryAddressNotes
        deliveryDate
        deliveryTime
        deliveryNotes
        deliveryFee
        paymentMethod
        patientPhoneNumber
        status {
            key
            val
        }
        total,
        reason,
        createdAt,
        updatedAt
    }
`;

export const ORDER_ITEM_FIELDS = gql`
    fragment OrderItemFields on OrderItemType {
        id
        picture
        title
        description
        qty
        price
        homeService
        prescriptionRequired
        priceAfterDiscount
        itemId
        hasPrescription
        prescription {
          appointmentId
        }
        prescriptionFile {
          id
          file
          filename
        } 
    }
`;

export const ORDER_PHARMACY_FIELDS = gql`
    fragment OrderPharmacyFields on OrderPharmacyType {
        id
        title
        area
        block
        street
        building
        email
        phones
        deliveryTime
        deliveryFee
        minimumOrderPrice
        workingHours {
          mon {
            timeFrom
            timeTo
          }
          tue  {
            timeFrom
            timeTo
          }
          wed {
            timeFrom
            timeTo
          }
          thu {
            timeFrom
            timeTo
          }
          fri {
            timeFrom
            timeTo
          }
          sat {
            timeFrom
            timeTo
          }
          sun {
            timeFrom
            timeTo
          }
        }
    }
`;

