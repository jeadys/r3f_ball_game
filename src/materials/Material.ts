import { BoxGeometry, MeshStandardMaterial } from "three";
import { ColorManagement } from "three";

ColorManagement.enabled = true;

export const boxGeometry = new BoxGeometry(1, 1, 1);

export const startFloorMaterial = new MeshStandardMaterial({
  color: "limegreen",
});

export const endFloorMaterial = new MeshStandardMaterial({
  color: "greenyellow",
});

export const obstacleMaterial = new MeshStandardMaterial({
  color: "orangered",
});

export const wallMaterial = new MeshStandardMaterial({ color: "slategrey" });
