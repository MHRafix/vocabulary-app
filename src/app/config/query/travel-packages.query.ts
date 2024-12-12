import { gql } from "@apollo/client";

export const GET_TRAVEL_PACKAGES = gql`
  query TRAVEL_PACKAGES($input: TravelPackageListQueryDto) {
    travelPackages(input: $input) {
      nodes {
        _id
        packageTitle
        regularPrice
        salePrice
        saleStatus
        isPublished
        packageStatus
        thumbnail
        countDown {
          bookingStart
          bookingEnd
        }
        destination {
          name
          lat
          lng
        }
      }
      meta {
        totalCount
        currentPage
        hasNextPage
        totalPages
      }
    }
  }
`;

export const GET_SINGLE_TRAVEL_PACKAGE = gql`
  query GET_SINGLE_PACKAGE($packageId: String) {
    travelPackage(input: { key: "_id", operator: eq, value: $packageId }) {
      _id
      packageTitle
      regularPrice
      salePrice
      saleStatus
      isPublished
      packageStatus
      thumbnail
      description
      shortDescription
      countDown {
        bookingStart
        bookingEnd
      }
      destination {
        name
        lat
        lng
      }
      departureFrom {
        name
        lat
        lng
      }
      ratingsAndReviews {
        rating
        email
        message
      }
      travelers {
        travelerEmail
      }
      transportation {
        tourBy
        departureDate
        departureTime
        departureStation
        destinationStation
        arrivalTime
        arrivalDate
        transportName
        stops
        journeyBreak
      }
      carouselThumbnails
    }
  }
`;

export interface IFilterQuery {
  page?: number;
  limit?: number;
  sort?: string;
  sortBy?: string;
  where?: { key: string; operator: string; value: string }[];
}
