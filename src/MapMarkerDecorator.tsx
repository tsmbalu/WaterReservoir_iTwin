import { DecorateContext, Decorator, IModelConnection, Marker, ScreenViewport } from "@itwin/core-frontend";
import { Point3d } from "@itwin/core-geometry";
import { MarkerData } from "./common/marker-pin/MarkerPinDecorator";

export class MapMarkerDecorator implements Decorator {
  private _iModel: IModelConnection;
  private _markerSet: Marker[];

  constructor(vp: ScreenViewport) {
    this._iModel = vp.iModel;
    this._markerSet = [];

    this.addMarkers();
  }

  private async addMarkers() {

    const markersData: MarkerData[] = [
            // Example: { point: Point3d.create(longitude, latitude, 0), title: "Marker 1" },
      { point: Point3d.create(-0.0792, 51.5233, 0), title: "London", description: "Description 1" }
    ];

    markersData.forEach(marker => {
      const mapMarker = new Marker(
        { x: marker.point.x, y: marker.point.y, z: 0},
        { x: 50, y: 50 }
      );

      const htmlElement = document.createElement("div");
      htmlElement.innerHTML = `
        <h3>${marker.title}</h3>
      `

      mapMarker.htmlElement = htmlElement;

      this._markerSet.push(mapMarker);
    })
  }

  public decorate(context: DecorateContext): void {
    this._markerSet.forEach(marker => {
      marker.addDecoration(context);
    })
  }
} 