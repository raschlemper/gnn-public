package vision.infra;

import java.awt.Color;


public class Slice implements Comparable<Slice>{
	private String description;
	private double value;
	private int angle;
	private Color color;

	public Slice(String description, double value) {
		this.description = description;
		this.value = value;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getValue() {
		return value;
	}

	public void setValue(double value) {
		this.value = value;
	}

	public int getAngle() {
		return angle;
	}

	public void setAngle(int angle) {
		this.angle = angle;
	}

	public Color getColor() {
		return color;
	}

	public void setColor(Color color) {
		this.color = color;
	}

	@Override
	public int compareTo(Slice o) {
		return o.getAngle() - this.getAngle();
	}
}