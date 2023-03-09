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

  it("Return event partitionkey as String", () => {
    const event = { partitionKey: 1 };
    expect(deterministicPartitionKey(event)).toBe("1");
  });

  it("Return hashed candidate", () => {
    const event = {
      partitionKey:
        "oclFmYsZVKEI4OrnxNHX9QWedBaiCCkWh4RdX4FyUALYsi40F63pYspfpN9mrCV30HuZhwQ44jrtgvaaeQBF0omoEgnT7kDjP1hmROgZlD6s9Flc9LeBGNMlBi5nWbzhT3kc5uEbEZIGhMDrHjtT2qbQA0CJYoXLy6D6hI56TbPX4nMQxIItCFx7yndyUMshHRWu6UZjEqepTfvxUeoQYsZIke5RwJWufs8tJAcJWW9k5eyiWUkhErblVyMR477Pn",
    };

    expect(deterministicPartitionKey(event)).toBe(
      crypto.createHash("sha3-512").update(event.partitionKey).digest("hex")
    );
  });
});
