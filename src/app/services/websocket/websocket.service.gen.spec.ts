import { TestBed } from "@angular/core/testing";
import { WebsocketService } from "./websocket.service";
describe("WebsocketService", () => {
  let service: WebsocketService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [WebsocketService] });
    service = TestBed.get(WebsocketService);
  });
  it("can load instance", () => {
    expect(service).toBeTruthy();
  });
});
