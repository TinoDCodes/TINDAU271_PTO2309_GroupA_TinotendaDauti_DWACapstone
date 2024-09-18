interface Props {
  params: {
    id: string;
  };
}

export default function SharedFavouritesPage({ params }: Props) {
  return <div className="wrapper">Shared Favourites for user: {params.id}</div>;
}
