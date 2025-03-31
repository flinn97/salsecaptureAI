import "./css/default.scss";
import "./css/defaultColumn.scss";
import "./css/defaultRow.scss";
import "./css/defaultRowWrap.scss";
import "./css/interactiveMapTheme.scss";
import "./css/sideBar.scss"

/**
 * Several different types and themes so provide a base class
 */
class DefaultRegistry {
  MCMapContainer = "Map-Container";
  MCMapSection = "Map-Section";
  MCLink = "Map-Link";
  MCCell = "Map-Cell";
  MCCustomDelItem = "Map-Custom-Del-Item";
  MCDelItem = "Map-Del-Item";
  MCDelImgItem = "Map-Del-imgItem";
  MCCustomEditItem = "Map-Custom-Edit-Item";
  MCEditImgItem = "Map-Edit-imgItem";
  MCEditItem = "Map-Edit-Item";
  MCAttributeItem = "Map-Attribute-Item";
  MCImgItem = "Map-imgItem";
  MCTextItem = "Map-Text-Item";
  MCActiveItem = "Map-Active-Item";
  MCCustom = "";
  MCBackgroundItem= "background-item";
  MCCellBackground="cell-background";
  MCBackgroundLink="cell-background";
  MCLogoItem="navLogo";


}

/**
 * column ui for maps
 */
class DefaultColumn extends DefaultRegistry {
  MCSectionHover = "DC-Map-Section:hover";
  MCCustomDelItem = "DC-Custom-Del-Item";
  MCDelItem = "DC-Del-Item";
  MCDelImgItem = "DC-Del-imgItem";
  MCCustomEditItem = "Map-Custom-Edit-Item";
  MCEditImgItem = "DC-Edit-imgItem";
  MCEditItem = "DC-Edit-Item";



}


/**
 * row ui for maps
 */
class DefaultRow extends DefaultColumn {
  MCMapContainer = "DR-Map-Container";
  MCMapSection = "DR-Map-Section";
}

/**
 * wrap row for maps
 */
class DefaultWrapRow extends DefaultRow {
  MCMapContainer = "DRW-Map-Container";
}

/**
 * for the interactive map
 */
class InteractiveMap extends DefaultRow {
  MCMapContainer = "IM-Map-Container";
  MCMapSection = "IM-Map-Section";
  MCMap = "IM-Map";
  MCAddButton = "IM-addButton";
  MCActiveItem = "IM-Active-Item";
  MCCell="IM-Cell"
}

/**
 * for the side bar nav which uses the map component
 */
class SideBar extends DefaultRow{
  MCActiveLink= this.MCActiveItem;
  MCLinkItem= this.MCLink;
  MCMapSection = "SB-Map-Section";


}
/**
 * for the links in the nav
 */
class Links extends DefaultColumn{
  MCActiveLink= this.MCActiveItem;
  MCLinkItem= this.MCLink;
  MCMapSection = "SB-link";
  MCCell = "SB-Cell-Link";
  MCLink = "SB-Map-Link";
  MCLinkItem= "SB-Map-Link";


}
/**
 * for the top nav
 */
class TopBar extends DefaultColumn{
  MCActiveLink= this.MCActiveItem;
  MCLinkItem= this.MCLink;
}


export {DefaultRegistry,Links, DefaultColumn, DefaultRow, DefaultWrapRow, InteractiveMap, SideBar, TopBar}


