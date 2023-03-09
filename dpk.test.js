const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns event partitionkey if exists", () => {
    const event = { partitionKey: "1" };
    expect(deterministicPartitionKey(event)).toBe("1");
  });

  it("Return hashed event if no partitionKey", () => {
    const event = { otherKey: "123" };

    expect(deterministicPartitionKey(event)).toBe(
      crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex")
    );
  });
});
