import { Image } from "@react-native-elements/base";
import Carusel from "react-native-snap-carousel";

export default function CarouselView(props) {
  const { arrayImages, height, width } = props;

  const renderItem = ({ item }) => {
    return <Image style={{ width, height }} source={{ uri: item }} />;
  };

  return (
    <Carusel
      layout="default"
      data={arrayImages}
      sliderWidth={width}
      itemWidth={width}
      renderItem={renderItem}
    />
  );
}
