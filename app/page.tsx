import Container from "./Components/Container/Container";
import ListingCard from "./Components/ListingCard/ListingCard";
import NoListingFound from "./Components/NoListingFound/NoListingFound";
import { getCurrentUser } from "./actions/getCurrentUser";
import { getListing } from "./actions/getListings";
import styles from "./page.module.scss";

export default async function Home() {
  const listings = await getListing();
  const currentUser = await getCurrentUser();

  if (listings?.length === 0) {
    return (
      <Container>
        <div className={styles.notFound}>
          <NoListingFound
            title="No listings was found for this category"
            subtitle="Try changing filters"
            showButton
          />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className={styles.listings}>
        {listings.map((listing) => {        
          return (
            <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
          );
        })}
      </div>
    </Container>
  );
}
